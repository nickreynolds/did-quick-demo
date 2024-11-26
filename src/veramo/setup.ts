import { createAgent, IResolver } from '@veramo/core'

import { DIDResolverPlugin } from '@veramo/did-resolver'
import { getResolver as ethrDidResolver } from 'ethr-did-resolver'
import { getResolver as webDidResolver } from 'web-did-resolver'
import { getResolver as quickDidResolver } from 'did-provider-quick'
import { getResolver as keyDidResolver } from 'key-did-resolver'

// You will need to get a project ID from infura https://www.infura.io
const INFURA_PROJECT_ID = '1b02d102e6ae45e4ace8348bfccbec0a'

export const agent = createAgent<IResolver>({
    plugins: [
        new DIDResolverPlugin({
            ...ethrDidResolver({ infuraProjectId: INFURA_PROJECT_ID }),
            ...quickDidResolver({
                nodeEndpoint: 'https://didmediate.com/resolveDIDQuick'
            }),
            ...webDidResolver(),
            ...keyDidResolver(),
        }),
    ],
})