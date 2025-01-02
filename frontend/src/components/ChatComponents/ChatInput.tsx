import React, { useEffect, useRef, useState } from 'react';
import { Image as ImageIcon, Loader, Send, Smile, X } from 'lucide-react';
import useChatStore from '../../store/useChatStore';
import toast from 'react-hot-toast';
import { useWindowSize } from '../../lib/useWindowSize';
import breakpoints from '../../lib/breakpoint';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { cn } from '../../lib/utils';

const MOBILE_MAX_BREAKPOINT = breakpoints.mobile.breakpoints.max;

function ChatInput() {
  const [windowWidth] = useWindowSize();
  const uploadRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);

  const [message, setMessage] = useState<{
    message: string;
    image: string;
  }>({
    message: '',
    image: '',
  });

  const { selectedUser, sendMessage, slideMenuOnMobile } = useChatStore();

  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(e.target as Node)
    ) {
      setShowPicker(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  // SEND MESSAGE HANDLER
  async function handleSendMessage() {
    setLoading(true);
    setShowPicker(false);
    if (!selectedUser) return;

    try {
      if (message.message.length > 0 || message.image) {
        await sendMessage(message, selectedUser._id);

        if (uploadRef.current) {
          uploadRef.current.value = '';
        }
      }
      // Clear input
      setMessage({ message: '', image: '' });
      setLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  function handleImage(e: any) {
    setUploadImageLoading(true);
    const MAX_FILE_SIZE = 5 * 1024 * 1024; //5 MB
    const file = e.target.files[0];

    if (!file.type.startsWith('image')) {
      setUploadImageLoading(false);

      return toast.error('Only image format is allowed');
    }
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setUploadImageLoading(false);

        // 5 MB limit
        return toast.error(
          'File size is too large,try to upload a smaller image than 5 MB'
        );
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;

        setMessage((prev) => {
          return {
            ...prev,
            image: base64,
          };
        });
        setUploadImageLoading(false);
      };
    }
  }

  function handleOpenInputFile() {
    uploadRef.current?.click();
  }

  function handleRemovePreviewImage() {
    setMessage({ ...message, image: '' });
    // Clear the use ref data
    if (uploadRef.current) {
      uploadRef.current.value = '';
    }
  }

  // EMOJI PICKER
  const [showPicker, setShowPicker] = useState(false); // To toggle emoji picker

  // ON MOBILE WHEN LIST IS EXPANDED HIDE INPUT
  if (windowWidth < MOBILE_MAX_BREAKPOINT && slideMenuOnMobile.chat === 1) {
    return null;
  }

  // HANDLE EMOJI SELECTION
  const handleEmojiClick = (emojiData: any) => {
    setMessage((prev) => {
      return {
        ...prev,
        message: prev.message + emojiData.emoji,
      };
    });
  };

  // HANDLE KEYPRESS (to delete emojis or text)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Backspace') {
      setMessage((prev) => {
        return {
          ...prev,
          message: prev.message.slice(0, -1),
        };
      });
    }
    if (
      (e.key === 'Enter' && message.image) ||
      (e.key === 'Enter' && message.message)
    ) {
      handleSendMessage();
      setShowPicker(false);
    }
  };

  return (
    <div
      className='lg:p-4 md:p-4 lg:pt-4 lg:pb-4 md:pt-4 md:pb-4 pt-1 pb-1 border-t border-base-300  bg-base-200 relative '
      ref={emojiPickerRef}
    >
      {/* IMAGE PREVIEW */}
      {showPicker && (
        <div className='absolute left-0  bottom-20 z-10  rounded-lg '>
          <EmojiPicker
            height={windowWidth < MOBILE_MAX_BREAKPOINT ? 300 : 450}
            width={windowWidth < MOBILE_MAX_BREAKPOINT ? 225 : 400}
            onEmojiClick={handleEmojiClick}
            theme={'dark' as Theme}
          />
        </div>
      )}

      {message.image && (
        <div className='absolute -top-16 bg-slate-300 rounded-lg z-10  '>
          <div
            onClick={handleRemovePreviewImage}
            className=' cursor-pointer w-6 h-6 flex justify-center items-center  rounded-full bg-primary border-solid border-[1px] border-black absolute -top-2 -right-2 hover:border-white z-20'
          >
            <X className=' w-4 text-primary-content/70 text-base ' />
          </div>
          <div className='h-full w-full relative overflow-hidden bg-slate-300 rounded-lg'>
            <img
              className=' object-contain h-16 z-20 '
              src={message.image}
              alt='image preview'
              width={100}
              height={100}
            />
          </div>
        </div>
      )}
      <div className='flex md:gap-4 lg:gap-4 gap-0 items-center justify-between lg:pl-0 md:pl-0 pl-1'>
        <label className='w-full relative flex items-center'>
          <textarea
            onChange={(e) =>
              setMessage({ ...message, message: e.target.value as string })
            }
            value={message.message}
            placeholder={'Type a message...'}
            className={
              'w-full p-2 resize-none input input-bordered flex-1 text-sm lg:pr-10 md:pr-10 '
            }
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <Smile
            className={cn(
              ' rounded-full absolute right-2 bottom-[50%] translate-y-[50%] lg:block md:block hidden transition-colors duration-200 hover:text-primary',
              showPicker
                ? 'ring-4 text-base-content/70 ring-base-content/70'
                : 'text-base-content/70'
            )}
            onClick={() => setShowPicker((prev) => !prev)}
          >
            {showPicker ? 'Hide Emoji Picker' : 'Show Emoji Picker'}
          </Smile>
        </label>
        <div className='lg:flex md:flex lg:gap-3  md:gap-2 lg:flex-row md:flex-row  flex-col items-center hidden'>
          <button
            onClick={handleOpenInputFile}
            className={cn(
              'btn btn-primary lg:w-12 md:w-12 lg:h-10 md:h-10 lg:p-2 md:p-2 ',
              [
                'w-8  p-0 ', //for mobile
              ]
            )}
          >
            {uploadImageLoading ? (
              <Loader className=' animate-spin w-8 h-8 text-black ' />
            ) : (
              <ImageIcon size={18} className=' font-bold' strokeWidth={2} />
            )}
          </button>

          <input
            ref={uploadRef}
            type='file'
            className=' hidden'
            onChange={handleImage}
          />

          <button
            disabled={!message.image && !message.message}
            onClick={() => handleSendMessage()}
            className={cn(
              'btn btn-primary lg:w-12 md:w-12 lg:h-10 md:h-10 lg:p-2 md:p-2 ',
              [
                'w-8   p-0 ', //for mobile
              ]
            )}
          >
            {loading ? (
              <Loader className=' animate-spin w-8 h-8 text-black ' />
            ) : (
              <Send
                size={18}
                className={`${
                  !message.image && !message.message
                    ? 'text-primary'
                    : 'text-base'
                }`}
                strokeWidth={2}
              />
            )}
          </button>
        </div>

        {/* MOBILE */}
        <div className='flex  flex-col items-center md:hidden lg:hidden '>
          {uploadImageLoading ? (
            <Loader
              width={18}
              height={18}
              className=' animate-spin text-base m-2 '
            />
          ) : (
            <ImageIcon
              onClick={handleOpenInputFile}
              size={18}
              className=' font-bold cursor-pointer m-2'
              strokeWidth={2}
            />
          )}

          <input
            ref={uploadRef}
            type='file'
            className=' hidden'
            onChange={handleImage}
          />

          {loading ? (
            <Loader
              width={18}
              height={18}
              className=' animate-spin text-base m-2 '
            />
          ) : (
            <Send
              size={18}
              className={cn(
                'm-2 cursor-pointer',
                `${
                  !message.image && !message.message
                    ? 'text-primary'
                    : 'text-base'
                }`
              )}
              strokeWidth={2}
              onClick={() => {
                !message.image && !message.message
                  ? () => {}
                  : handleSendMessage();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
