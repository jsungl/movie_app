import { useState } from 'react';
import IconButton from '@mui/material/Button';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Badge from '@mui/material/Badge';
import { Button, Drawer, List } from 'antd';
import axios from 'axios';


export default function NotificationDrawer({ notifications, setNotifications }) {
    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    }

    const showDrawer = () => {
        setOpen(true);
    }

    const onClickDelete = (index) => () => {
        let deleteId = notifications[index]._id;

        axios.post('/api/notification/deleteNotification', { id: deleteId })
        .then(res => {
            if(res.data.success) {
                const result = notifications.filter((data,idx) => data._id !== deleteId)
                setNotifications([...result]);
            }else {
                alert('알림삭제 실패');
            }
        })

    }

    const list = (
        <div>
            
            <List
                dataSource={notifications}
                renderItem={(item,index) => (
                <List.Item>
                    {
                        item.action === 'reply' ?
                        `${item.responseFrom.name}님이 "${item.commentId.content}"에 답글을 달았습니다`
                        : (item.action === 'like') ? `${item.responseFrom.name}님이 "${item.commentId.content}"를 좋아합니다` 
                        : `${item.responseFrom.name}님이 "${item.commentId.content}"를 싫어합니다`
                    }
                    <Button size='small' onClick={onClickDelete(index)}>확인</Button>
                </List.Item>
                )}
            />
           
        </div>
    )

  return (
      <>
        <IconButton size="large" onClick={showDrawer}>
            {notifications.length > 0 ?
                <Badge color="error" variant="dot">
                    <NotificationsNoneIcon/>
                </Badge>
                :
                <NotificationsNoneIcon/>
            }
        </IconButton>
        <Drawer title="Notification" placement="right" onClose={onClose} open={open}>
            {list}
        </Drawer>
    </>    
  );
}