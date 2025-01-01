const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside
      className='h-full w-20 lg:w-72  border-base-300 
    flex flex-col transition-all duration-200'
    >
      {/* CONTACTS */}
      <div className='overflow-y-auto w-full py-2'>
        {skeletonContacts.map((_, id) => (
          <div key={id} className='w-full p-2 flex items-center gap-3'>
            {/* AVATAR */}
            <div className='relative mx-auto lg:mx-0'>
              <div className='skeleton size-10 rounded-full' />
            </div>

            {/* USER INFO */}
            <div className='hidden lg:block text-left min-w-0 flex-1'>
              <div className='skeleton h-4 w-32 mb-2' />
              <div className='skeleton h-3 w-16' />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
