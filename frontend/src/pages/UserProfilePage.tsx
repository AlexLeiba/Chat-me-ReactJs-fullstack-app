import React, { useEffect, useState } from 'react';

import { Container, Row, Col } from '../components/UI/Grid';
import { ChevronLeft, Eye, User } from 'lucide-react';

import { Input } from '../components/UI/Input/Input';
import { Spacer } from '../components/UI/spacer/spacer';

import useChatStore from '../store/useChatStore';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

function UserProfilePage() {
  const navigate = useNavigate();
  const { selectedUser } = useChatStore();
  const [openLightbox, setOpenLightbox] = useState({
    visible: false,
    index: 0,
  });

  useEffect(() => {
    if (!selectedUser) return navigate('/');
  }, [selectedUser]);

  function handleShowProfileImage() {
    const displayedImage = selectedUser?.profilePicture;
    if (displayedImage) {
      return (
        <div
          className='relative'
          onClick={() =>
            setOpenLightbox({
              visible: true,
              index: 0,
            })
          }
        >
          <img
            width={100}
            height={100}
            src={displayedImage}
            alt='profile picture'
            className='rounded-full w-40 h-40 object-cover ring-4 ring-primary cursor-pointer'
          />
          <Eye className='absolute bottom-2 right-2 cursor-pointer' />
        </div>
      );
    } else {
      return (
        <img
          onClick={() =>
            setOpenLightbox({
              visible: true,
              index: 0,
            })
          }
          width={100}
          height={100}
          src={'/default-avatar.png'}
          alt='profile picture'
          className='rounded-full w-40 h-40 object-cover ring-4 ring-primary'
        />
      );
    }
  }

  return (
    <Container spacing='medium'>
      <ChevronLeft className='cursor-pointer' onClick={() => navigate('/')} />
      <Lightbox
        plugins={[Zoom]}
        open={openLightbox.visible}
        close={() =>
          setOpenLightbox({
            visible: false,
            index: 0,
          })
        }
        slides={[
          {
            src: selectedUser?.profilePicture
              ? selectedUser?.profilePicture
              : '/default-avatar.png',
          },
        ]}
      />
      <Row>
        <Col lg={6} lgOffset={3}>
          <div className='text-center flex justify-center items-center flex-col'>
            <h2> {selectedUser?.fullName}`s Profile</h2>
          </div>

          <Spacer size={6} />
          <div className='flex justify-center flex-col items-center gap-2'>
            <div className='relative rounded-full w-40 h-40 flex justify-center items-center bg-gray-400'>
              {handleShowProfileImage()}
            </div>
          </div>
          <Spacer size={8} />
          <Input
            defaultValue={selectedUser?.fullName}
            leftIcon={<User />}
            label={'Full name'}
            type={'text'}
            placeholder={'Your full name'}
            className={'grow'}
            error={''}
            readOnly
          />

          <Spacer size={8} />

          {selectedUser?.lastTimeActive && (
            <div className='flex justify-between items-center gap-2'>
              <p>Last time active</p>
              <p className='text-sm'>
                {format(selectedUser?.lastTimeActive, 'MM/dd/yyyy: HH:mm')}
              </p>
            </div>
          )}

          <div className='flex justify-between items-center gap-2'>
            <p>Email</p>
            <p className='text-sm'>{selectedUser?.email}</p>
          </div>
          <div className='flex justify-between items-center gap-2'>
            <p>Member since</p>
            <p className='text-sm'>
              {selectedUser && format(selectedUser?.createdAt, 'MM/dd/yyyy')}
            </p>
          </div>

          {selectedUser?.favoriteTheme && (
            <div className='flex justify-between items-center gap-2'>
              <p>Favorite theme</p>
              <p className='text-sm'>{selectedUser?.favoriteTheme}</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default UserProfilePage;
