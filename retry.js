function retry(func, times, timeout) {
    return (...args) => {
        let count = 0;
        return new Promise((resolve, reject) => {
          
            const attmpt = () => func(...args).then(resolve).catch(error => {
                console.log(`第${count}次重试`)
                if (count < times) {
                    setTimeout(() => {
                        attmpt();
                        count++;

                    }, timeout)
                  
                  
                } else {
                    reject(error);
                }
            })
            attmpt();
        })
    }
};

const func = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('error');
        }, 1000)
    })
};

let retryFunc = retry(func, 3, 1000);

retryFunc().catch(error => {
    console.log('重试失败');
})