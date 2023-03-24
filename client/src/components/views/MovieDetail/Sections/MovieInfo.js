import { Descriptions } from 'antd';

export default function MovieInfo({ movie }) {

    return (
        <Descriptions 
            title="Movie Info" 
            bordered
            column={{
                xxl: 4,
                xl: 3,
                lg: 3,
                md: 3,
                sm: 2,
                xs: 1,
              }}
        >
            <Descriptions.Item label="Title">{movie.original_title}</Descriptions.Item>
            <Descriptions.Item label="release_date">{movie.release_date}</Descriptions.Item>
            <Descriptions.Item label="revenue">{movie.revenue}</Descriptions.Item>
            <Descriptions.Item label="runtime">{movie.runtime}</Descriptions.Item>
            <Descriptions.Item label="vote_averate" span={2}>
                {movie.vote_average}
            </Descriptions.Item>
            <Descriptions.Item label="vote_count">{movie.vote_count}</Descriptions.Item>
            <Descriptions.Item label="status">{movie.status}</Descriptions.Item>
            <Descriptions.Item label="popularity">{movie.popularity}</Descriptions.Item>
        </Descriptions>
    );
}