import Link from "next/link";
import Image from "next/image";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";


interface PostProps {
    slug: string;
}


export default function BlogPost({slug}: PostProps) {

    const post = {
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, reprehenderit!',
        slug: 'lorem-ipsum-dolor-sit-amet1',
        publishedAt: '06/07/2026',
        content: `# Lorem Ipsum Dolor Sit Amet
 
*Published on January 1, 2026 · 6 min read*
 
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
 
## Introduction
 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus, eu mattis nisi consectetur a. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo, sed fringilla mauris sit amet nibh.
 
Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, **quis gravida magna mi a libero**. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus.
 
## The Main Idea
 
Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In ac dui quis mi consectetuer lacinia.
 
> Praesent venenatis metus at tortor pulvinar varius. Quisque rutrum aenean imperdiet etiam ultricies nisi vel augue.
 
Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.
 
### Key Points to Consider
 
There are a few things worth keeping in mind as you read through:
 
- **Pellentesque habitant morbi** — tristique senectus et netus et malesuada fames ac turpis egestas.
- **Vestibulum tortor quam** — feugiat vitae, ultricies eget, tempor sit amet, ante.
- **Donec eu libero sit amet** — quam egestas semper aenean ultricies mi vitae est.
- **Mauris placerat eleifend** — leo quisque sit amet est et sapien ullamcorper pharetra.
Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
 
## A Deeper Look
 
Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.
 
1. Maecenas tempus, tellus eget condimentum rhoncus.
2. Sem quam semper libero, sit amet adipiscing sem neque sed ipsum.
3. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.
Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. You can also reference [an external link](https://example.com) inline like this, or drop in a bit of inline code where it helps.
 
 
## Conclusion
 
Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien.
 
Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla vestibulum ante ipsum.`,
}

  return (
    <>
      <header className="text-xl my-4 mx-5">
        <Link href="/blog">Ryan Bread's Blog</Link>
      </header>
      <div className="mx-10 my-5">
          <Image src={'/default.png'} alt="yeah" width={500} height={500}></Image>
      </div>
      <div className="flex">
        
        <div className="flex flex-col">
            <div className="text-3xl">
                {post.title}
            </div>
            <div className="text-md">
                {post.publishedAt}
            </div>
        </div>

        <div className="text-xl">
            {post.description}
        </div>

      </div>

      <article className="prose prose-neutral mx-auto my-4">
        <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
      </article>
    </>
  );
}