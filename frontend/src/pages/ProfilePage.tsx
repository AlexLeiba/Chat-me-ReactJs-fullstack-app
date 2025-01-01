'use client';
import React, { useRef, useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import { Container, Row, Col } from '../components/UI/Grid';
import { Camera, Loader, User } from 'lucide-react';
import { Input } from '../components/UI/Input/Input';
import { Spacer } from '../components/UI/spacer/spacer';
import { Button } from '../components/UI/Button/Button';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import toast from 'react-hot-toast';

function ProfilePage() {
  const [openLightbox, setOpenLightbox] = useState({
    visible: false,
    index: 0,
  });

  const [uploadedImagePreview, setUploadedImagePreview] = useState<
    string | null
  >('');
  const [fullName, setFullName] = useState('');
  const refUploadImage = useRef<HTMLInputElement>(null);

  const {
    isLoadingUpdateProfile,
    updateProfile,
    authUser,
    loadingUpdateFullName,
    updateFullName,
  } = useAuthStore();
  console.log('🚀 ~ Page ~ authUser:', authUser);

  function handleUploadImage() {
    refUploadImage.current?.click();
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const MAX_FILE_SIZE = 10 * 1024 * 1024; //10 MB
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        // 10 MB limit
        return toast.error(
          'File size is too large,try to upload a smaller image than 10 MB'
        );
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const base64Image = reader.result as string;
        setUploadedImagePreview(base64Image);

        updateProfile({ profilePicture: base64Image });
      };
    }
  }

  function handleShowProfileImage() {
    const displayedImage = uploadedImagePreview
      ? uploadedImagePreview
      : authUser?.profilePicture;
    if (displayedImage) {
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
          src={displayedImage}
          alt='profile picture'
          className='rounded-full w-40 h-40 object-cover ring-4 ring-primary'
        />
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
    <Container>
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
            src: authUser?.profilePicture
              ? authUser?.profilePicture
              : '/default-avatar.png',
          },
        ]}
      />
      <Row>
        <Col lg={6} lgOffset={3} sm={4}>
          <Spacer size={6} />
          <div className='text-center flex justify-center items-center flex-col'>
            <h2>Profile</h2>
            <p>Your profile information</p>
          </div>

          <Spacer size={6} />
          <div className='flex justify-center flex-col items-center gap-2'>
            <div className='relative rounded-full w-40 h-40 flex justify-center items-center bg-gray-400'>
              {handleShowProfileImage()}

              <div className='hover:bg-slate-200 rounded-full w-12 h-12 bg-slate-300 pointer absolute bottom-0 right-0 flex justify-center items-center'>
                {isLoadingUpdateProfile ? (
                  <Loader className=' animate-spin w-8 h-8 text-black ' />
                ) : (
                  <Camera
                    onClick={() => handleUploadImage()}
                    className='w-6 h-6 text-black cursor-pointer '
                  />
                )}
              </div>
              <input
                disabled={isLoadingUpdateProfile}
                onChange={(e) => handleImageUpload(e)}
                ref={refUploadImage}
                type='file'
                className='hidden'
              />
            </div>
            <p className='text-sm'>
              Click on the camera icon to upload your profile picture
            </p>
          </div>
          <Spacer size={8} />
          <Input
            disabled={loadingUpdateFullName}
            onChange={(e) => setFullName(e.target.value)}
            defaultValue={authUser?.fullName}
            leftIcon={<User />}
            label={'Full name'}
            type={'text'}
            placeholder={'Your full name'}
            className={'grow'}
            error={''}
          />
          <Spacer size={4} />
          <Button
            loading={loadingUpdateFullName}
            onClick={() => updateFullName(fullName)}
            className={'btn bg-primary/70 w-full '}
          >
            <p className='text-primary-content'>Update full name</p>
          </Button>

          <Spacer size={8} />

          <div className='flex justify-between items-center gap-2'>
            <p>Email:</p>
            <p className='text-sm'>{authUser?.email}</p>
          </div>
          <div className='flex justify-between items-center gap-2'>
            <p>Member since</p>
            <p className='text-sm'>{authUser?.createdAt?.substring(0, 10)}</p>
          </div>
          <div className='flex justify-between items-center gap-2'>
            <p>Last updated profile</p>
            <p className='text-sm'>{authUser?.updatedAt?.substring(0, 10)}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
