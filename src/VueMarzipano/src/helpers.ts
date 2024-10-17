function generateGUID() {
    return 'xxxx-xxxx-4xxx-yxxx-xxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

export const updateHotspots = (hotspots: any[]) => {
    return hotspots.map((c: { id: any; }) => ({
        ...c,
        id: c?.id || generateGUID()
    }));
};