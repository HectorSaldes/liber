import {Toast} from 'primereact/toast';
import React, {useState, useRef, useEffect} from 'react';
import IconsService from '../../service/IconsService';
import SkeletonCard from '../../components/SkeletonCard';
import IconCard from '../../components/IconCard';
import ButtonUp from '../../components/ButtonUp';
import ButtonMore from '../../components/ButtonMore';
import EmptySearch from '../../components/EmptySearch';
import Search from '../../components/Search';
import Title from "../../components/Title";

export default function IconsByWord() {

  const toast = useRef(null);
  const [listSearch, setListSearch] = useState([]);
  const [valueSelected, setValueSelected] = useState(null);
  const [categorySelected, setCategorySelected] = useState('all');
  const [platformList, setPlatformList] = useState([{
    label: 'All styles',
    value: 'all'
  }]);
  const [offsetSelected, setOffsetSelected] = useState(0);
  const [listOfIcons, setListOfIcons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    getPlatformStyles()
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => setScroll(window.pageYOffset);

  const goScrollUp = () => {
    window.scrollTo(0, 0);
    document.querySelector('#inputSearch').focus();
  };

  const getPlatformStyles = () => {
    IconsService.getPlatformsStyles().then(data => {
      setPlatformList(Object.values(data.data.result).map((item) => {
        return {label: item.title, value: item.apiCode}
      }))
    }).catch(err => console.error(err))
  }

  const cleanFilters = () => {
    setListSearch([]);
    setValueSelected(null);
    setCategorySelected('all');
    setOffsetSelected(0);
    setListOfIcons([]);
    messages('success', 'Screen cleaned', 'I repeat, screen cleaned');
  };

  const cleanMessages = () => toast.current.clear();

  const messages = (severity, summary, detail) => {
    toast.current.show({severity, summary, detail, life: 3000});
  };

  const querySearch = async (text) => {
    return IconsService.autoComplete(text)
      .then(({data: {data}}) => data)
      .catch(() => null);
  };

  const getAllIcons = async () => {
    const allIcons = await IconsService.searchIcons(valueSelected, categorySelected, offsetSelected,);
    setListOfIcons(allIcons);
    return allIcons.length !== 0;
  };

  const searchWithText = async ({query}) => {
    const data = await querySearch(query);
    const replace = await data.map((d) => d.replaceAll('-', ' '));
    setListSearch(replace);
  };

  const searchIcons = async (e) => {
    try {
      if (e === 'Enter') {
        messages('info', 'Searching...');
        if (valueSelected) {
          let flag = await getAllIcons();
          if (flag) cleanMessages();
          else messages('error', 'We did not fount results', 'Try searching anything else',);
        } else messages('error', 'You must type a word', 'For looking for',);

      }
    } catch (error) {
      messages('error', 'There was an error', 'Try do it again',);
    }
  };

  const getPartialcons = async () => {
    const allIcons = await IconsService.searchIcons(valueSelected, categorySelected, offsetSelected + 50,);
    setListOfIcons([...listOfIcons, ...allIcons]);
  };

  const onLoadingClick = () => {
    setLoading(true);
    setOffsetSelected(offsetSelected + 50);
    getPartialcons();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const convertSvgToFileAndDownload = (svg, name) => {
    const decode = atob(svg);
    const blob = new Blob([decode]);
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', `${name}.svg`);
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(fileUrl);
    link.parentNode.removeChild(link);
  };

  const getIconToDownload = async (id, commonName) => {
    try {
      await IconsService.getIcon(id).then(({data}) => {
        convertSvgToFileAndDownload(data.icon.svg, commonName);
      });
    } catch (error) {
      messages('error', 'Ocurrió un error al esperar al servidor', 'Vuelve a intentarlo un poco más tarde',);
    }
  };

  return (
    <div className='p-4'>
      <Toast ref={toast}></Toast>
      <div className='text-center'>
        <Title title='Icons by word' description='Here you can download icons, whatever you want i think'/>
      </div>
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
          : listOfIcons.length === 0 ? (<SkeletonCard/>)
            : (listOfIcons && listOfIcons.map((i, key) => (
                <IconCard payload={i} key={key} getIconToDownload={getIconToDownload}/>
              ))
            )}
        {listOfIcons.length !== 0 && (
          <ButtonMore
            title='Load more icons...'
            loading={loading}
            onLoadingClick={onLoadingClick}
          />
        )}
      </div>
      {scroll >= 200 && <ButtonUp goScrollUp={goScrollUp}/>}
    </div>
  );
}
