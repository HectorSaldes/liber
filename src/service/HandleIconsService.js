export const parseIconToSvg = (icon, name, group='') => {
    let message = {
        type: 'error',
        title: 'Icon not downloaded',
        desc:'The icon could not be downloaded, please try again later.'
    }
    try {
        let isSvg = icon.formats.some((format) => format === "svg");
        let isPng = icon.formats.some((format) => format === "png");
        if (isSvg) {
            const decode = atob(icon.svg);
            const blob = new Blob([decode]);
            const fileUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = fileUrl;
            link.setAttribute("download", `${group}-${name}.svg`);
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(fileUrl);
            link.parentNode.removeChild(link);
        } else if (isPng) {
            const imageUrl = `https://img.icons8.com/?id=${icon.id}&format=png&size=${icon.pngSizes[icon.pngSizes.length - 1]}`;
            fetch(imageUrl)
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(new Blob([blob]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", `${group}-${name}.png`);
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                });
        }
        let message = {
            type: 'success',
            title: 'Icon downloaded',
            desc:'The icon was downloaded successfully.'
        }
    } catch (error) {
        console.error(error)
    }
    return message;
}