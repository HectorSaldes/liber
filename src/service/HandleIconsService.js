export const parseIconToSvg = (icon, name) => {
    let message = {
        type: 'error', title: 'There was an error to download', desc: 'Try another icon'
    };
    try {
        let isSvg = icon.formats.some((format) => format === "svg");
        let isPng = icon.formats.some((format) => format === "png");

        if (isSvg) {
            const decode = atob(icon.svg);
            const blob = new Blob([decode]);
            const fileUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = fileUrl;
            link.setAttribute("download", `${name}.svg`);
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(fileUrl);
            link.parentNode.removeChild(link);
            message = {
                type: 'success', title: 'Icon in SVG', desc: 'The icon was downloaded successfully'
            };
        } else if(isPng){
            const imageUrl = `https://img.icons8.com/?id=${icon.id}&format=png&size=${icon.pngSizes[icon.pngSizes.length - 1]}`;
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = this.width;
                canvas.height = this.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0);
                canvas.toBlob(function(blob) {
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = `${name}.png`;
                    document.body.appendChild(link);
                    link.click();
                    URL.revokeObjectURL(link.href);
                    link.parentNode.removeChild(link);
                }, "image/png");
            };
            img.src = imageUrl;
            message = {
                type: 'success', title: 'Icon in PNG', desc: 'The icon was downloaded successfully'
            };
        }
    } catch (error) {
        console.error(error)
    }
    return message;
}