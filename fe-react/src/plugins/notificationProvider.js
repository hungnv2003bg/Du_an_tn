const openNotification = (title, content, type, api) => {
    const placement = 'bottomRight'
    switch (type) {
        case 'success':
            api.success({
                message: title,
                description:
                    content,
                placement,
            });
            break;
        case 'info':
            api.info({
                message: title,
                description:
                    content,
                placement,
            });
            break;
        case 'error':
            api.error({
                message: title,
                description:
                    content,
                placement,
            });
            break;
        case 'warning':
            api.warning({
                message: title,
                description:
                    content,
                placement,
            });
            break;
        case 'open':
            api.open({
                message: title,
                description:
                    content,
                placement,
            });
            break;
        default:
    }
};
export { openNotification }