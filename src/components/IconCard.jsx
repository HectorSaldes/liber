import {useEffect, useState} from "react";
import {Button} from "primereact/button";
import {getIconToDownload} from "../service/HandleIconsService";

export default function IconCard({icon, autodownload = false, collection = ''}) {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const {name, commonName, platform, id} = icon;

    useEffect(() => {
        if (autodownload) download()
    }, []);

    const download = async () => {
        setLoading(true)
        let res = await getIconToDownload(icon, collection)
        if (res) setSuccess('bg-green-50')
        else setSuccess('bg-red-50')
        setLoading(false)
    }

    return (
        <div className={`col-1 flex align-items-center justify-content-center border-1 border-gray-50 flex-column border-round-2xl ${success}`}
             key={id}>
            <img src={`https://img.icons8.com/${platform}/2x/${commonName}.png`} height={80} width={80} alt="icon"/>
            <div className="w-full white-space-nowrap overflow-hidden text-overflow-clip">{name}</div>
            <Button icon="pi pi-download" rounded raised text onClick={download} loading={loading}
                    disabled={success === 'bg-red-50'}/>
        </div>
    );
}
