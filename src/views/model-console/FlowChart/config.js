export default {
    //拖动设置
    DragOptions: { cursor: 'pointer', zIndex: 2000 },
    //覆盖加到每个连接
    ConnectionOverlays: [
        ['Arrow', {
            location: 1,
            visible: true,
            width: 8,
            length: 8,
            id: 'ARROW'
        }]
    ],
    //拖动不会自动断开
    ConnectionsDetachable: false
}
