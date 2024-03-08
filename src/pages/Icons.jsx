import {useState} from "react";
import {Splitter, SplitterPanel} from 'primereact/splitter';
import {AutoComplete} from "primereact/autocomplete";
import React from "react";
import {Button} from "primereact/button";
import IconsService from "../service/IconsService";
import IconCard from "../components/IconCard";

const iconsService = new IconsService();

const TOTAL_AMOUNT = 100;
let OFFSET = 0;


const Title = ({text}) => (<div className='text-center text-4xl font-bold'>{text}</div>)


const NoIcons = () =>
    (
        <div className='text-center text-gray-200 w-full h-full flex justify-content-center align-items-center'>
            <div>
                <i className="text-8xl pi pi-discord"/>
                <div className='text-4xl font-italic'>There are no icons to show yet</div>
            </div>
        </div>
    )


const Loading = () =>
    (
        <div className='text-center text-gray-200 w-full h-full flex justify-content-center align-items-center'>
            <div><i className="pi pi-spin pi-spinner text-8xl"/>
                <div className='text-4xl font-italic'>Loading...</div>
            </div>
        </div>
    )

export default function Icons() {


    const [input, setInput] = useState('')
    const [selectAutoComplete, setSelectAutoComplete] = useState([])
    const [listIcons, setListIcons] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingIcons, setLoadingIcons] = useState(false)
    const [downloadAll, setDownloadAll] = useState(false)

    const [stopLoadingIcons, setStopLoadingIcons] = useState(false)


    const search = async (key) => {
        if (key === "Enter" && input.length !== 0) {
            setLoading(true)
            setListIcons([])
            setStopLoadingIcons(false)
            if (input.startsWith('#')) {
                await getIconId(input.slice(1))
            } else {
                await getIconsWords(true)
            }
            setLoading(false)
        }
    }

    const clear = () => {
        setInput('')
        setSelectAutoComplete([])
        setListIcons([])
        setLoading(false)
    }

    const autoCompleteMethod = async (e) => {
        setLoading(true)
        iconsService.autoComplete(e.query)
            .then(({data: {data}}) => setSelectAutoComplete(data))
            .catch(() => setSelectAutoComplete([]))
            .finally(() => setLoading(false))
    }

    const getIconId = async (id) => {
        setLoadingIcons(true)
        setDownloadAll(false)
        try {
            const {data: {icon}} = await iconsService.getIcon(id)
            setListIcons([icon])
        } catch (e) {
            console.log(e)
        } finally {
            setLoadingIcons(false)
        }
    }

    const getIconsWords = async (initial = false) => {
        setLoadingIcons(true)
        setDownloadAll(false)
        try {
            OFFSET = initial ? 0 : OFFSET + TOTAL_AMOUNT;
            setListIcons([])
            let allIcons = []
            const {data: {icons}} = await iconsService.searchIcons(input, 'all', OFFSET, TOTAL_AMOUNT);
            if (icons.length === 0) setStopLoadingIcons(true)
            allIcons = [...icons, ...listIcons,];
            setListIcons(allIcons)
        } catch (e) {
            console.log(e)
        } finally {
            setLoadingIcons(false)
        }
    };

    const RenderIcons = () => {
        if (!loading && listIcons.length !== 0)
            return (
                <div className='text-center'>
                    <Button icon='pi pi-search' className='my-3 mr-1' label="Load more icons" severity="warning" raised
                            loading={loadingIcons} onClick={() => getIconsWords(false)} disabled={stopLoadingIcons}/>
                    <Button icon='pi pi-download' className='my-3' label="Download all" severity="info" raised
                            loading={loadingIcons} onClick={() => setDownloadAll(true)}/>
                    <div className='grid'>{listIcons.map((i, key) => (
                        <IconCard key={key} icon={i} autodownload={downloadAll}/>))}</div>
                </div>

            )
        else if (loading) return <Loading/>
        else return <NoIcons/>
    }

    return (
        <Splitter className='h-screen w-full mt-3'>
            <SplitterPanel minSize={20} size={20} className='p-2'>
                <div className='w-full'>
                    <div className="col-12">
                        <Title text='Search'/>
                    </div>
                    <AutoComplete
                        autoFocus
                        placeholder='Search by word or for ID use #'
                        value={input}
                        onChange={(e) => setInput(e.value)}
                        onKeyPress={({key}) => search(key)}
                        completeMethod={autoCompleteMethod}
                        suggestions={selectAutoComplete}
                        className='col-12'
                        inputStyle={{width: "100%",}}
                    />
                    <div className="col-12">
                        <Button label='Search' className='col-12' icon='pi pi-search' loading={loading}
                                disabled={!input || input.length === 0} onClick={() => search("Enter")}/>
                    </div>
                    <div className="col-12">
                        <Button label='Clear' className='col-12' icon='pi pi-ban' severity="help" onClick={clear}/>
                    </div>
                </div>
            </SplitterPanel>


            <SplitterPanel minSize={80} size={80} className='p-2 overflow-auto'>
                <Title text='Icons'/>
                <RenderIcons/>
            </SplitterPanel>
        </Splitter>
    );
}
