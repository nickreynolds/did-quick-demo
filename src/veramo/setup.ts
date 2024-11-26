import { getResolver as ethrDidResolver } from 'ethr-did-resolver'
import { getResolver as webDidResolver } from 'web-did-resolver'
import { QuickDIDProvider, getResolver as quickDidResolver } from 'did-provider-quick'
import { getResolver as keyDidResolver } from 'key-did-resolver'

import {
    createAgent,
    ICredentialPlugin,
    IDIDManager,
    IKeyManager,
    IResolver,
} from '@veramo/core'
import { CredentialPlugin, W3cMessageHandler } from '@veramo/credential-w3c'
import {
    CredentialIssuerEIP712,
    ICredentialIssuerEIP712,
} from '@veramo/credential-eip712'
import { AbstractIdentifierProvider, DIDManager } from '@veramo/did-manager'
import { DIDResolverPlugin } from '@veramo/did-resolver'
import { KeyManager } from '@veramo/key-manager'
import { SdrMessageHandler } from '@veramo/selective-disclosure'
import { JwtMessageHandler } from '@veramo/did-jwt'
import { MessageHandler } from '@veramo/message-handler'
import { Web3KeyManagementSystem } from '@veramo/kms-web3'
import { AbstractMessageHandler } from '@veramo/message-handler'

import {
    DataStoreJson,
    DIDStoreJson,
    KeyStoreJson,
    BrowserLocalStorageStore,
    PrivateKeyStoreJson,
} from '@veramo/data-store-json'

import { EthrDIDProvider } from '@veramo/did-provider-ethr'
import { PkhDIDProvider, getDidPkhResolver } from '@veramo/did-provider-pkh'
import { KeyDIDProvider, getDidKeyResolver } from '@veramo/did-provider-key'
import { JwkDIDProvider, getDidJwkResolver } from '@veramo/did-provider-jwk'
import {
    PeerDIDProvider,
    getResolver as peerDidResolver,
} from '@veramo/did-provider-peer'
import { MinimalImportableKey } from '@veramo/core'
import {
    DIDComm,
    DIDCommHttpTransport,
    DIDCommMessageHandler,
    CoordinateMediationRecipientMessageHandler,
    PickupRecipientMessageHandler,
} from '@veramo/did-comm'
import { KeyManagementSystem } from '@veramo/kms-local'


import { DIDDiscovery } from '@veramo/did-discovery'

import {
    CredentialIssuerLD,
    ICredentialIssuerLD,
    LdDefaultContexts,
    VeramoEcdsaSecp256k1RecoverySignature2020,
    VeramoEd25519Signature2018,
} from '@veramo/credential-ld'
import { contexts as credential_contexts } from '@transmute/credentials-context'

const dataStore = BrowserLocalStorageStore.fromLocalStorage('veramo-state')
const identifierDataStore =
    BrowserLocalStorageStore.fromLocalStorage('veramo-id-state')

// You will need to get a project ID from infura https://www.infura.io
const INFURA_PROJECT_ID = '1b02d102e6ae45e4ace8348bfccbec0a'

const keyStore = new KeyStoreJson(identifierDataStore)
const privateKeyStore = new PrivateKeyStoreJson(identifierDataStore)
const didStore = new DIDStoreJson(identifierDataStore)

const didProviders: Record<string, AbstractIdentifierProvider> = {
    'did:key': new KeyDIDProvider({ defaultKms: 'local' }),
    'did:quick': new QuickDIDProvider({ defaultKms: 'local', relayerUrl: 'https://didmediate.com' }),
    // TODO: add ethr and pkh providers backed by kmsLocal here too?
}

export const agent = createAgent<IResolver & IDIDManager & IKeyManager>({
    plugins: [
        new DIDResolverPlugin({
            ...ethrDidResolver({ infuraProjectId: INFURA_PROJECT_ID }),
            ...quickDidResolver({
                nodeEndpoint: 'https://didmediate.com/resolveDIDQuick'
            }),
            ...webDidResolver(),
            ...keyDidResolver(),
        }),
        new KeyManager({
            store: keyStore,
            kms: {
                local: new KeyManagementSystem(privateKeyStore),
            },
        }),
        new DIDManager({
            store: didStore,
            defaultProvider: 'did:quick',
            providers: didProviders,
        }),
        new CredentialPlugin(),
    ],
})