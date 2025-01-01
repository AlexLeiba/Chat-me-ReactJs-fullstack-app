import React, { useEffect, useRef, useState } from 'react';
import { Image as ImageIcon, Send, Smile, X } from 'lucide-react';
import useChatStore from '../../store/useChatStore';
import toast from 'react-hot-toast';
import { useWindowSize } from '../../lib/useWindowSize';
import breakpoints from '../../lib/breakpoint';
import EmojiPicker from 'emoji-picker-react';
import { cn } from '../../lib/utils';

const MOBILE_MAX_BREAKPOINT = breakpoints.mobile.breakpoints.max;

function ChatInput() {
  const [windowWidth] = useWindowSize();
  const uploadRef = useRef<HTMLInputElement>(null);

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
    // Clear input
    setMessage({ message: '', image: '' });
    setShowPicker(false);
    if (!selectedUser) return;

    try {
      if (message.message || message.image) {
        await sendMessage(message, selectedUser._id);

        if (uploadRef.current) {
          uploadRef.current.value = '';
        }
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }

  function handleImage(e: any) {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; //5 MB
    const file = e.target.files[0];

    if (!file.type.startsWith('image')) {
      return toast.error('Only image format is allowed');
    }
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        // 10 MB limit
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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
      className='lg:p-4 md:p-4 pt-4 pb-4 border-t border-base-300  bg-base-200 relative '
      ref={emojiPickerRef}
    >
      {/* IMAGE PREVIEW */}
      {showPicker && (
        <div className='absolute lg:left-4 md:left-4 -left-2  bottom-20 z-10 bg-white rounded-lg p-4'>
          <EmojiPicker
            height={windowWidth < MOBILE_MAX_BREAKPOINT ? 300 : 450}
            width={windowWidth < MOBILE_MAX_BREAKPOINT ? 225 : 400}
            onEmojiClick={handleEmojiClick}
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
      <div className='flex gap-4 items-center justify-between'>
        <label className='w-full relative'>
          <input
            onChange={(e) =>
              setMessage({ ...message, message: e.target.value as string })
            }
            value={message.message}
            placeholder={'Type a message...'}
            className={
              'w-full p-2 resize-none input input-bordered flex-1 text-sm pr-10 '
            }
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <Smile
            className={cn(
              ' rounded-full absolute right-2 bottom-3',
              showPicker ? 'text-primary ring-4' : 'text-base-content/70'
            )}
            onClick={() => setShowPicker((prev) => !prev)}
          >
            {showPicker ? 'Hide Emoji Picker' : 'Show Emoji Picker'}
          </Smile>
        </label>
        <div className='flex md:gap-3 lg:gap-3 gap-2 '>
          <button
            onClick={handleOpenInputFile}
            className='btn btn-primary lg:w-12 md:w-12 lg:h-10 md:h-10 lg:p-2 md:p-2 w-8 p-0 '
          >
            <ImageIcon size={18} className=' font-bold' strokeWidth={2} />
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
            className='btn btn-primary  lg:w-12 md:w-12 lg:h-10 md:h-10 lg:p-2 md:p-2 w-8 p-0 '
          >
            <Send
              size={18}
              className={`${
                !message.image && !message.message
                  ? 'text-primary'
                  : 'text-base'
              }`}
              strokeWidth={2}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
