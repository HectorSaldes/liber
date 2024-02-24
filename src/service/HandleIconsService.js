import IconsService from "../service/IconsService";

const iconsService = new IconsService();


export async function getIconToDownload(icon, collection = '') {
    return iconsService.getIcon(icon?.id).then(({data}) => parseIconToSvg(data.icon, collection)).catch(() => false);
}


function parseIconToSvg(icon, collection = '') {
    let success = false
    try {
        let isSvg = icon.formats.some((format) => format === "svg");
        let isPng = icon.formats.some((format) => format === "png");
        if (isSvg) {
            const decode = atob(icon?.svg);
            const blob = new Blob([decode]);
            const fileUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = fileUrl;
            link.setAttribute("download", `${collection}-${icon?.commonName}.svg`);
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(fileUrl);
            link.parentNode.removeChild(link);
            success = true
        } else if (isPng) {
            const imageUrl = `https://img.icons8.com/?id=${icon.id}&format=png&size=${icon?.pngSizes[icon?.pngSizes.length - 1]}`;
            fetch(imageUrl)
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(new Blob([blob]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", `${collection}-${icon?.commonName}.png`);
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                });
            success = true
        }
    } catch (error) {
        success = false
        console.error(error)
    }
    return success
}