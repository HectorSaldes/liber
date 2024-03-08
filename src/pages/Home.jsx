import {Card} from "primereact/card";
import Isotipo from '../assets/svg/Isotipo.svg'

const ITEMS = [
    {
        title: "Icons8 - IconsByWord for IconsByWord",
        image:
            "https://getintopc.com/wp-content/uploads/2019/05/Pichon-Icons8-Latest-Version-Download-GetintoPC.com_.png",
        text: "IconsByWord that will be showed only will be downloaded in SVG format premium from Icons8.",
    },
    {
        title: "Icons8 - Illustrations for Illustrations",
        image: "https://maxst.icons8.com/vue-static/ouch/seo/opengraph.png",
        text: "Las ilustraciones mostradas son descargadas en formato PNG, en la mejor calidad posible para ser utilizadas en presentaciones, infografías o cualquier otro medio.",
    },
    {
        title: "Icons8 - Upscaler for Images",
        image: "https://i.ytimg.com/vi/ciQ83A20mHM/maxresdefault.jpg",
        text: "Images that you saved will be saved locally in your computer on the services from AWS, the images probably will be available during a month, so is not like a Google Drive or similar",
    },
];

export default function Home() {
    return (
        <>
            <div className='text-center mx-auto'>
                <img src={Isotipo} alt='Isotipo' className='w-2 h-2 lg:w-1 lg:h-1'/>
                <div className='font-semibold text-8xl'>LIBER</div>
                <div className='text-2xl text-yellow-600'>LIBER from Roman means free</div>
                <div className='text-2xl my-2'>This is a proyect created to help others to download and upload resources completely free from {" "}
                    <a className='text-green-500 font-bold' href="https://icons8.com/"
                       target='_blank' rel='noreferrer'>Icons8
                    </a>
                </div>
            </div>
            <div className='grid'>
                {ITEMS.map((c, index) => (
                    <div className='col-12 lg:col-4' key={index}>
                        <Card className='mb-2' title={c.title}
                              header={<img style={{objectFit: 'cover'}} height='200px' alt={c.title} src={c.image}/>}>
                            <div className='text-justify text-xl h-5rem'>{c.text}</div>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
}
