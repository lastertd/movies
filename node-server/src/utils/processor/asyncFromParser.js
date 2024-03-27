import formiable from "formidable";


const check = function (obj) {
    for (let objKey in obj) {
        if (obj[objKey] === undefined || obj[objKey] === ''){
            return false
        }
    }
    return true
}


/**
 *
 * @param req {object}
 * @return {Promise<[object, object]>}
 */
const asyncFromParser = function (req) {
    return new Promise((resolve, reject) => {

        const form = formiable({});

        form.parse(req, (err, fields, files) => {

            if (err) {
                reject(err);
                return
            }

           if (!check(fields)) {
               reject('参数不完整');
               return;
           }

            resolve([fields, files]);

        })
    })
}


export  default asyncFromParser