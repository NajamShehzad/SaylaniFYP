import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

export const GetInfoUSer = () => {

return new Promise((resolve, reject) => {

    const infoRequest = new GraphRequest('/me', null, ((error, result) => {
        if (error) {
            reject(error)
        } else {
           resolve(result)
        }
    }))

    new GraphRequestManager().addRequest(infoRequest).start();

  })
}