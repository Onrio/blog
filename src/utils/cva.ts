import { cva } from 'class-variance-authority';

export const header = cva(
  'border-b border-custom-gray dark:border-custom-gray-dark'
);
export const headerContainer = cva(
  'container flex justify-between mx-auto p-4 items-center'
);
export const headerLogo = cva('font-bold text-2xl text-black dark:text-white');
export const headerUl = cva('gap-4 hidden md:flex');
export const headerList = cva('flex', {
  variants: {
    child: {
      a: 'text-text-light dark:hover:text-white hover:text-black',
    },
  },
});
export const headerBtns = cva('flex gap-4 items-center');
export const headerButton = cva(
  'w-9 h-9 p-2 hover:bg-gray-200 dark:hover:bg-[rgb(33,37,53)] flex justify-center items-center border border-solid border-gray-200 dark:border-[rgb(33,37,53)]'
);
export const langButton = cva(
  'w-9 h-9 p-2 hover:bg-gray-200 dark:hover:bg-[rgb(33,37,53)] flex justify-center items-center transition duration-300'
);
export const dropdownMenu = cva(
  'absolute w-40 top-10 right-0 bg-white border border-gray-200 rounded shadow-lg p-1'
);
export const dropdownButton = cva(
  'block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200 rounded'
);
export const footer = cva(
  'h-16 bg-[rgba(215,217,224,0.5)] dark:bg-[rgba(31,33,40,0.5)]'
);
export const footerContainer = cva(
  'container flex items-center justify-center h-16 text-[hsl(229,10%,63%)] dark:text-[hsl(229 23% 99%)] mx-auto '
);
export const signInBtp = cva(
  'px-4 py-2 bg-[rgba(61,97,255,0.945)] text-[rgb(252,252,253)] rounded-[8px] font-medium text-[14px]'
);

export const loginContainer = cva('flex justify-center items-center');
export const loginBox = cva(
  'w-[446px] max-h-full border border-gray-200 dark:border-[rgb(31,41,55)] rounded-[12px] shadow-[rgba(0,0,0,0.1)_0px_1px_2px_0px] p-6 flex flex-col items-center'
);
export const loginTitle = cva(
  'font-bold text-2xl mb-2 text-[rgb(3,5,12)] dark:text-[rgb(255,255,255)]'
);
export const loginSubtitle = cva(
  'text-[rgb(85,88,104)] text-[14px] mb-[24px] dark:text-[rgb(151,155,170)]'
);
export const loginLabel = cva(
  'text-[rgb(3,5,12)] dark:text-[rgb(255,255,255)] text-[14px] mb-2'
);
export const loginInput = cva(
  'w-full p-2 mb-4 border border-gray-300 rounded dark:bg-custom-gray-dark dark:border-[rgb(51,61,75)]'
);
export const loginButton = cva(
  'w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
);
export const loginLinks = cva(
  'w-full flex justify-between mt-4 text-sm text-blue-600 dark:text-blue-400'
);

export const blogArticleContainer = cva('w-full h-96 md:w-2/3');
export const blogArticleBox = cva(
  'w-full p-6 border border-gray-300 rounded-lg shadow-md dark:border-[rgb(51,61,75)]'
);
export const blogArticleImageContainer = cva(
  'h-52 overflow-hidden rounded-lg mb-4'
);
export const blogArticleImage = cva('w-full h-full object-cover mb-4');
export const blogArticleTitle = cva(
  'text-xl font-bold mb-2 text-[rgb(3,5,12)] dark:text-[rgb(255,255,255)]'
);
export const blogArticleMeta = cva(
  'flex gap-2 text-sm text-gray-500 mb-6 dark:text-[rgb(151,155,170)]'
);
export const blogArticleDescription = cva(
  'text-gray-600 mb-6 dark:text-[rgb(151,155,170)]'
);
export const blogArticleButton = cva(
  'px-3 py-1 text-sm text-[hsl(229,20%,30%)] bg-blue-100 rounded dark:bg-[rgb(33,37,53)] dark:text-[rgb(255,255,255)]'
);

export const sidebarContainer = cva('md:w-1/3');
export const sidebarBox = cva(
  'w-full p-6 border border-gray-300 rounded-lg shadow-md mb-8 dark:border-[rgb(51,61,75)]'
);
export const title = cva(
  'text-lg font-medium mb-6 text-[rgb(3,5,12)] dark:text-[rgb(255,255,255)]'
);
export const tagButton = cva(
  'px-3 py-1 text-sm text-white bg-blue-600 rounded'
);
export const authorContainer = cva('flex flex-col gap-4');
export const authorItem = cva('flex items-center gap-4');
export const authorImageContainer = cva(
  'w-10 h-10 rounded-full overflow-hidden'
);
export const authorImage = cva('w-full h-full object-cover');
export const authorName = cva(
  'text-sm font-semibold text-[rgb(3,5,12)] dark:text-[rgb(255,255,255)]'
);
export const authorDescription = cva(
  'text-sm text-gray-500 dark:text-[rgb(151,155,170)]'
);
