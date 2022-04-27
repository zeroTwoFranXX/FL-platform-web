// list host's dataset
export const ListHostDataset = () => {
    return ([
        {
            name: 'host-dataset-01',
            computeId: '10001',
            namespaced: 'host-n1',
            with_label: 'label-01'
        },
        {
            name: 'host-dataset-02',
            computeId: '10002',
            namespaced: 'host-n1',
            with_label: 'label-02'
        },
        {
            name: 'host-dataset-03',
            computeId: '10003',
            namespaced: 'host-n2',
            with_label: 'label-03'
        },
        {
            name: 'host-dataset-04',
            computeId: '10004',
            namespaced: 'host-n2',
            with_label: 'label-04'
        }
    ])
}

// list guest's dataset
export const ListGuestDataset = () => {
    return ([
        {
            name: 'guest-dataset-01',
            computeId: '20001',
            namespaced: 'guest-n1',
            with_label: 'label-guest-01'
        },
        {
            name: 'guest-dataset-02',
            computeId: '20002',
            namespaced: 'guest-n1',
            with_label: 'label-guest-01'
        }
    ])
}
