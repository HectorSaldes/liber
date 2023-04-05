import React, {useState, useRef, useEffect} from "react";
import {parseIconToSvg} from "../../service/HandleIconsService";
import IconCard from "../../components/IconCard";
import EmptySearch from "../../components/EmptySearch";
import Title from "../../components/Title";
import {InputText} from 'primereact/inputtext';
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import IconsService from "../../service/IconsService";
import {Toast} from "primereact/toast";

const _IconsService = new IconsService();

function IconsByCategory() {
    const toast = useRef(null);

    const [grid, setGrid] = useState([]);

    const [generalSubcategories, setGeneralSubcategories] = useState([]);

    const [listCategories, setListCategories] = useState([]);
    const [valueCategories, setValueCategories] = useState("");

    const [listSubcategories, setListSubcategories] = useState([]);
    const [valueSubcategories, setValueSubcategories] = useState("");

    const [originalGroups, setOriginalGroups] = useState([]);

    const [listGroups, setListGroups] = useState([]);
    const [valueGroups, setValueGroups] = useState("");

    useEffect(() => {
        getServiceCategories();
    }, []);

    useEffect(() => {
        getCategories();
        // eslint-disable-next-line
    }, [generalSubcategories]);

    useEffect(() => {
        getSubcategories();
        // eslint-disable-next-line
    }, [valueCategories]);

    useEffect(() => {
        getGroups();
        // eslint-disable-next-line
    }, [valueSubcategories]);


    useEffect(() => {
        getGrid();
        // eslint-disable-next-line
    }, [valueGroups]);


    const getServiceCategories = async () => {
        const categoriesAndSubcategories = await _IconsService.getCategoriesAndSubcategories()
        setGeneralSubcategories(categoriesAndSubcategories);
    };

    const getCategories = () => {
        if (generalSubcategories.length > 0) {
            let categories = generalSubcategories.map((category) => {
                return {label: category.name, value: category.apiCode};
            });
            setListCategories(categories);
        }
    }

    const getSubcategories = () => {
        if (generalSubcategories.length > 0) {
            let subcategories = generalSubcategories.find((category) => category.apiCode === valueCategories);
            if (subcategories) {
                subcategories = subcategories.mainPreviews.map((subcategory) => {
                    return {label: subcategory.styleApiCode.toUpperCase(), value: subcategory.styleApiCode};
                });
                setListSubcategories(subcategories);
            }
        }
    }

    const getGroups = async () => {
        if (valueSubcategories !== "") {
            messages("info", "Loading groups", "I repeat, loading groups");
            let itter = 0;
            let groups = await _IconsService.getIconCategories(valueCategories, valueSubcategories, itter++);
            while (groups !== false){
                let response = await _IconsService.getIconCategories(valueCategories, valueSubcategories, (itter++*100));
                if(response){
                    groups.subcategory = groups.subcategory.concat(response.subcategory)
                }else{
                    break;
                }
                itter++;
            }
            if (groups) {
                let allGroups = groups.subcategory.map((group) => {
                    return {label: group.name, value: group.code};
                });
                setOriginalGroups(groups);
                setGrid(groups.subcategory)
                setListGroups(allGroups);
            }
            messages("success", "Groups loaded", "I repeat, groups loaded");
        }
    }

    const getGrid = () => {
        if (valueGroups.length > 0)
            setGrid(originalGroups.subcategory.filter((group) => group.code === valueGroups))
        else setGrid(originalGroups.subcategory)
    }

    const clearFilters = () => {
        setValueCategories("");
        setValueSubcategories("");
        setValueGroups("");
        setGrid([])
        cleanMessages();
        messages("success", "Screen cleaned", "I repeat, screen cleaned");
    };

    const cleanMessages = () => toast.current.clear();

    const messages = (severity, summary, detail) => {
        toast.current.show({severity, summary, detail, life: 3000})
    };

    const bulletDownload = async () => {
        messages("info", "Download started", "I repeat, download started");
        await grid.forEach((group) => {
            group.icons.forEach((icon) => {
                _IconsService.getIcon(icon.id)
                    .then(({data: {icon}}) => {
                        let  { type, title, desc} = parseIconToSvg(icon, icon.commonName)
                        messages(type, title, desc)
                    })
                    .catch((error) => console.error(error))
            })
        })
        messages("success", "Download finished", "I repeat, download finished");
    };

    const clearMessages = () => {
        cleanMessages();
    };

    return (
        <>
            <Toast ref={toast}/>
            <Title title='Icons by Categories' description='Here you can download icons, whatever you want i think'/>
            <div className='grid p-2'>
                <div className='col-12 col-offset-0 md:col-8 md:col-offset-2'>
                    <div className='grid'>
                        <div className='col-12 md:col-4'>
                            <Dropdown
                                filter
                                disabled={listCategories.length === 0}
                                style={{width: "100%"}}
                                options={listCategories}
                                value={valueCategories}
                                emptyMessage='No options'
                                placeholder='Select a category'
                                onChange={(e) => setValueCategories(e.value)}
                            />
                        </div>
                        <div className='col-12 md:col-4'>
                            <Dropdown
                                filter
                                disabled={listSubcategories.length === 0}
                                style={{width: "100%"}}
                                options={listSubcategories}
                                value={valueSubcategories}
                                emptyMessage='No options'
                                placeholder='Select a subcategory (platform)'
                                onChange={(e) => setValueSubcategories(e.value)}
                            />
                        </div>
                        <div className='col-12 md:col-4'>
                            <Dropdown
                                filter
                                disabled={listGroups.length === 0}
                                style={{width: "100%"}}
                                options={listGroups}
                                value={valueGroups}
                                emptyMessage='No options'
                                placeholder='Select a group'
                                onChange={(e) => setValueGroups(e.value)}
                            />
                        </div>
                        <div className='col-12 md:col-6'>
                            <InputText className='col-12'
                                       placeholder='Type a code category' value={valueCategories}
                                       onChange={(e) => setValueCategories(e.target.value)}/>
                        </div>
                        <div className='col-12 md:col-6'>
                            <InputText className='col-12'
                                       placeholder='Type a code subcategory (platform)' value={valueSubcategories}
                                       onChange={(e) => setValueSubcategories(e.target.value)}/>
                        </div>
                        <div className='col-6'>
                            <Button
                                label='Clear messages'
                                icon='pi pi-comment'
                                className='p-button-info'
                                onClick={() => clearMessages()}
                                style={{width: "100%"}}
                            />
                        </div>
                        <div className='col-6'>
                            <Button
                                label='Clear filters'
                                icon='pi pi-times'
                                className='p-button-danger'
                                onClick={() => clearFilters()}
                                style={{width: "100%"}}
                            />
                        </div>
                        {grid && (
                            <div className='col-12'>
                                <Button
                                    label="Download this"
                                    icon="pi pi-download"
                                    className="p-button p-button-warning"
                                    onClick={() => bulletDownload()}
                                    style={{width: "100%"}}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='text-center'>
                {!grid ? (<EmptySearch title='icons'/>) : (
                    grid?.map((group, index) => (
                            <div key={index}>
                                <h2>{group.name}</h2>
                                <div className='grid'>
                                    {group.icons.map((icon, index) => (<IconCard payload={icon} key={(index + 1)}  downloadble={false}/>))}
                                </div>
                            </div>
                        )
                    )
                )}
            </div>
        </>
    );
}

export default IconsByCategory;