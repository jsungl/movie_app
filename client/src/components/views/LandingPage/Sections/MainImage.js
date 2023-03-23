import { Carousel } from 'antd';
import { IMAGE_BASE_URL } from '../../../Config';


export default function MainImage({ images }) {
    
    const contentStyles = images.map((image,index) => {
        return {
            height: '500px',
            color: '#fff',
            background: `url("${IMAGE_BASE_URL}w1280${image.backdrop_path}")`,
            backgroundSize: '100%, cover',
            backgroundPosition: 'center, center'
        }
    });

    console.log(contentStyles);

    return (
        <Carousel autoplay>
            {contentStyles.map((style, index) => (
                <div key={index}>
                    <div style={style}>
                        <div style={{ position: 'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '2rem'}}>
                            <h2>{images[index].original_title}</h2>
                            <p style={{ fontSize: '1rem' }}>{images[index].overview}</p>
                        </div>
                    </div>
                </div>
            ))}
        </Carousel>
    );
}