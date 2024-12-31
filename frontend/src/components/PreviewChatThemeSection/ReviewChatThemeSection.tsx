import React from 'react';
import { PREVIEW_THEME_MESSAGES } from '../../consts/index';
import { Send, Image as ImageIcon } from 'lucide-react';
import { Spacer } from '../UI/spacer/spacer';
function ReviewChatThemeSection() {
  return (
    <div className='sticky top-16'>
      {/* Preview Section */}
      <h4>Preview chat with selected theme</h4>

      <Spacer size={4} />

      <div className='rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg'>
        <div className='p-4 bg-base-200'>
          <div className=' mx-auto'>
            {/* Mock Chat UI */}
            <div className='bg-base-100 rounded-xl shadow-sm overflow-hidden'>
              {/* Chat Header */}
              <div className='px-4 py-3 border-b border-base-300 bg-secondary/15'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium'>
                    J
                  </div>
                  <div>
                    <h5 className='font-medium text-sm'>John Doe</h5>
                    <p className='text-xs text-base-content/70'>Online</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className='p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100'>
                {PREVIEW_THEME_MESSAGES.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isSent ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {/* message bubble */}
                    <div
                      className={`
                      max-w-[80%] rounded-xl p-3 shadow-sm
                      ${
                        message.isSent
                          ? 'bg-primary text-primary-content'
                          : 'bg-base-200'
                      }
                    `}
                    >
                      <p className='text-sm'>{message.message}</p>
                      <p
                        className={`
                        text-[10px] mt-1.5
                        ${
                          message.isSent
                            ? 'text-primary-content/70'
                            : 'text-base-content/70'
                        }
                      `}
                      >
                        12:00 PM
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className='p-4 border-t border-base-300 bg-base-100'>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    className='input input-bordered flex-1 text-sm h-10'
                    placeholder='Type a message...'
                    value='This is a preview'
                    readOnly
                  />
                  <button className='btn btn-primary h-10 min-h-0 '>
                    <ImageIcon size={18} />
                  </button>
                  <button className='btn btn-primary h-10 min-h-0'>
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewChatThemeSection;
