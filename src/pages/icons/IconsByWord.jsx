import {Toast} from "primereact/toast";
import {parseIconToSvg} from "../../service/HandleIconsService";
import React, {useState, useRef, useEffect} from "react";
import IconsService from "../../service/IconsService";
import SkeletonCard from "../../components/SkeletonCard";
import IconCard from "../../components/IconCard";
import ButtonUp from "../../components/ButtonUp";
import ButtonMore from "../../components/ButtonMore";
import EmptySearch from "../../components/EmptySearch";
import Search from "../../components/Search";
import Title from "../../components/Title";

const _IconsService = new IconsService();

export default function IconsByWord() {
    const toast = useRef(null);
    const [listSearch, setListSearch] = useState([]);
    const [valueSelected, setValueSelected] = useState(null);
    const [categorySelected, setCategorySelected] = useState("all");
    const [platformList, setPlatformList] = useState([]);
    const [offsetSelected, setOffsetSelected] = useState(0);
    const [listOfIcons, setListOfIcons] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getPlatformStyles();
    }, []);


    const getPlatformStyles = async () => {
        const platformList = await _IconsService.getPlatforms()
        setPlatformList(platformList);
    };

    const cleanFilters = () => {
        setListSearch([]);
        setValueSelected(null);
        setCategorySelected("all");
        setOffsetSelected(0);
        setListOfIcons([]);
        messages("success", "Screen cleaned", "I repeat, screen cleaned");
    };

    const cleanMessages = () => toast.current.clear();

    const messages = (severity, summary, detail) => {
        toast.current.show({severity, summary, detail, life: 3000})
    };

    const querySearch = async (text) => {
        return _IconsService.autoComplete(text)
            .then(({data: {data}}) => data)
            .catch(() => null);
    };

    const getAllIcons = async () => {
        const allIcons = await _IconsService.searchIcons(
            valueSelected,
            categorySelected,
            offsetSelected,
        );
        setListOfIcons(allIcons);
        return allIcons.length !== 0;
    };

    const searchWithText = async ({query}) => {
        const data = await querySearch(query);
        const replace = await data.map((d) => d.replaceAll("-", " "));
        setListSearch(replace);
    };

    const searchIcons = async (e) => {
        try {
            if (e === "Enter") {
                messages("info", "Searching...");
                if (valueSelected) {
                    let flag = await getAllIcons();
                    if (flag) cleanMessages();
                    else messages("error", "We did not fount results", "Try searching anything else",);
                } else messages("error", "You must type a word", "For looking for");
            }
        } catch (error) {
            messages("error", "There was an error", "Try do it again");
        }
    };

    const getPartialcons = async () => {
        const allIcons = await _IconsService.searchIcons(
            valueSelected,
            categorySelected,
            offsetSelected + 50,
        );
        setListOfIcons([...listOfIcons, ...allIcons]);
    };

    const onLoadingClick = () => {
        setLoading(true);
        setOffsetSelected(offsetSelected + 50);
        getPartialcons();
        setTimeout(() => setLoading(false), 3000);
    };

    const getIconToDownload = async (id, commonName) => {
        try {
            await _IconsService.getIcon(id).then(({data}) => {
                const {type, title, desc} = parseIconToSvg(data.icon, commonName);
                messages(type, title, desc);
            });
        } catch (error) {
            messages("error", "There was an error", "Try do it again");
        }
    };

    return (
        <>
            <Toast ref={toast}/>
            <Title title='Icons by word' description='Here you can download icons, whatever you want i think'/>
            <Search
                autoCompleteState={valueSelected}
                autoCompleteSetState={setValueSelected}
                autoCompleteSuggetions={listSearch}
                autoCompleteMethod={searchWithText}
                autoCompleteSearchIcons={searchIcons}
                dropdownCategories={platformList}
                dropdownState={categorySelected}
                dropdownSetState={setCategorySelected}
                buttonSearch={searchIcons}
                buttonClear={cleanFilters}
            />
            <div className='grid'>
                {valueSelected === null ? (<EmptySearch title='icons' color='green'/>)
                    : !listOfIcons || listOfIcons.length === 0 ? (<SkeletonCard/>)
                        : (
                            listOfIcons?.map((i, key) => (
                                <IconCard
                                    payload={i}
                                    key={(key + 1)}
                                    getIconToDownload={getIconToDownload}
                                />
                            ))
                        )}
                {listOfIcons.length !== 0 && listOfIcons
                    && (<ButtonMore title='Load more icons...' loading={loading} onLoadingClick={onLoadingClick}/>)}
            </div>
            <ButtonUp/>
        </>
    );
}
