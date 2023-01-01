const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const socket = require('socket.io');
dotenv.config();
const app = express();
const io = socket(8081, {
    cors: {
        origin: '*'
    }
});

let userNames = {};
const image = {
    '22d5n': 'https://storage.googleapis.com/kagglesdsdata/datasets/38019/306654/samples/22d5n.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20221230%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20221230T092316Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=25ccaaaf30171d9ca8705148a19b22352b6de51ed18c4c31024f5f4e2b6838065d16099b2afc50f983d9eaad6f55f8267fa640a67cfcbac6de0c6f44ac5a4e4015337108128722a21ac2395c7c756748c1fda606cb34857abde5aedd82d2896bd68de422a41bcbffa6c935579f7885a703f2b567693fdb08a9e57fe41a289cc0370b79e081e5649b57041ef19c25f9d30f5fbe9f6a372c826eaa1f9f3dd6b533bfcd21bc0022544546a4968011490126a95ed67c8f38e8b52a204c927dd9169b64e572f4e0b4f443bbf392c00b68819aec2c0ab93004939fcb12f67a3e18f4f16de3489998aca73742595f2a0d1e5a3ee0ff4eac50b4ed783b779c130805874c',
    '23mdg': 'https://storage.googleapis.com/kagglesdsdata/datasets/38019/306654/samples/23mdg.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20221230%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20221230T092316Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=6230598dbc98f90766b7c058786edca5806c0ce0107d314453f939258de65b7f6cc0ed1e8e8edf314ccb4b7474af4bec1fff115cf5ac88b65014173bdbfe8bc8357e50384483f7ccb231c187f75f0c265bab70ba5edb9aa4895e695ae436f8dec104fd087ed940733ed4ff75e73e0c5cacc45d4653ea849a9638246f153518336fa1c3acf83e6b899ed88dfc8589d77324a5cd8a6fb1404a3b41b73bac266d764c377d27df1e64a604784f32771ef878b785dd5cdc5d85e752eb345a744e18e75e305682ffc9c1c1e3ba1148384039188dc6b943fbb88f134019c17fb7dfc97c79f492877d1d609557a521274746175a3cd2dcc8e833f760edc4d8a867191d02',
    '23n88': 'https://storage.googleapis.com/kagglesdsdata/datasets/38019/306654/samples/23n88.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20221230%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20221230T092316Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=10434a5187e96bb1ea9e751fb98273f6beb28aec8d16ee22be34149f905dc2b7497ec1501575ff61e93ec2ef8dbdff2f2c1708a2e1d1b69b5bfe4207d433f4128f9c0ce4cf225e54424022d1b54a1b35ec6258c9a20e2608234add52f6cacfbb44ef66f22d88471096a0ab2ce3f951ce27499ffd2c5e5b0cffcc5da91d218e2bbfcec20897479071c3876bc551a5f3ef470ff3045962404c5a79e71ac088a238e61de7c8e2433e4bbf85d0ba1e09ecc5f09329b49d3ddff6806cd7b533374b5eec74ee72d60f88627ffa7faada427cede5d263803a2923017348dce2802cde167fc5a3c0f076c8f4c2185709ad5124875a754bfe3378d9feaafeb07fff2aa496',
    '226md': 'https://storage.googleapis.com/kagglesdsdata/datasets/38019/306654/samples/226md.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20221230%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20221230T092316Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=0b263c9c8fbaec3135d76ffdc8680132e570b424ee1013527ac67e65e0c4e6636b88ab6599a43c1c49a3a7590de4e3d6c142b4015960c2540a17a8f28796864f05704b60aff85eaa828cddd33f8d2655311210cb338738f01cd39147b4379999b372e0bf8d0a31c9da0dc98ed4a0c3a0992b9e2067849fa2f0612df4706e91e25720b91462675d319b81c152441365a5ac3c4eec981b2ef1e7d25705a4675f371fe056636b8a1cd8e1175ed07b8f8c8d0ad3f24c9defce8e8575307ab80d497c58459d29be655f4ac37a85e80f861133ef544667aacef750d199671b44d530d9eceed0cf8db58925bc2ff13a0f3978014930f05f1b86a9c9f14e9c56a55c5fce',
    '2356g': 'https://storage.googleapis.com/kagglesdsdata/datasets/38019/306654/samples/2356g.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20221230%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20221230T092316Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=796dc86861ec9676b05a79d002eaae58461c94695c6136d9723ea09837d1ff472bf201783cc689178bbcdda5f0f9fe4a188565a7c578a2cb8eb435f84b7b19f60a1765e4fb4c457c8d9f9e1074119f197668b56a46983c41d90ec6adb33196ff60a9ef640395efae08b2644a5362f773bbd62f4f4ba6944f2070b3bb0a95e6916a295a9f1dbc27d1f2cfc1a259afca38fffeea25bfc95288fdc96b99e1f2e9eaae94c1eef0abff7fa08ad829832708fc1a1bdddc95a631e76d5034c99c3f6ecc0fc9caab233c90e59be8d73d22a9de4da60289a1282e04ca11de2f882848a5d42cc22fe9146b957aa0e14fb42a66721fc52a346290868c5394e58dfae312adf7'
};
let counter = 0;

io.on('connection', clientSocket => {
    if(counter == 4) {
        counter = 0;
    }
    clientSocket.emit('captcha-data', `${Object.keys(image)[counter]} ${Object.values(image)[counter]}`);
    counter++;

    clientSocket.on('client-connect', clientUsername => {
        userNames[clientSocket.id] = clientUsername;
        clientSocket.broadcast.emit('new-user-connected', clientUsername);
        clientSocket.emit('user-message', {name : 'Online', msg: `<--${clientUsername} Welcome to the Global Chat App-->` });
        console.log(userNames);
    });

    clientSocket.on('client-message', clientMessage => {
        clientSocket.broadcast.emit('global-message', { name: userNames[clientSocket.id], msg: clientMessage });
    })

    clientSocket.on('disconnect', () => {
        clientSocket.broadcast.emit('global-disconnection-message', { msg: `${userNames[clientSocket.id]} is disconnected` });
        delete userNames[clientSocket.id];
        console.log('disconnect');
    })
});

app.use(cors());

app.use("/", (req, res, next) => {
    res.status(200).send("Welcome to chat room server");
});

app.listen(8080, function () {
    console.log(`server is running at http://localhost:${process.env.PORT} `);
});

