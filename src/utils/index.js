export const downloadLink = (resource, file_name) => {
    const blob = new Blob([resource], {
        type: 'application/octet-stream'
    });

    const link = document.createElement('a');

    link.download = file_name;

    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
};
