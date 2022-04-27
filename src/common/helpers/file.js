/**
 * 保存 json 文件
 * @param {Object} data -- json object to save
 * @param {String} filename -- file name to save to
 * examples:
 * saveJson({name: 'A File'}, 'test.json')
 */
export const saveJSON = (data, filename) => {
    if (!data) {
        console.error('No Data')
    }
    if (!filename) filename = 'console.json'

    if (typeof data === 'object') {
        data = JSON.stringify(data)
    }

    let blob = new Blob([data], { type: 'text/json' })
    let e = document.createEvent('MouseEvent')
    let a = document.createElement('a')
    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}
