
export default function DetailMainImage({ image, title, text }) {
    
    return (

        <div style={{
            position: 'relative',
            width: '100%',
            height: '500px',
            color: '#fff',
            background: `url("${image}")`,
            backgroundSize: '100%, cover',
            backgroundPosition: 'center, center'
        }}> 

            <div>
                <div style={{ position: 'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '2rem' }}>
                    <h2 style={{ color: 'white' }}>{title}</h2>
                    <p style={{ color: 'white', fontSize: '1rem' }}>{text}</p>
                </div>
            </div>
        </div>

    );
}