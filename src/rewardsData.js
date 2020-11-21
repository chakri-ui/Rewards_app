
import metadata from './rewardsMetadata.json'
export const getRewardsData = (callPromise) => new Promise((resolve, reject) =>{
    if(callPromise){
        resolve(metadata)
    }
    else{
        reject('failure')
    }
})