import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const listItems = [
  {
    label : 'Home',
    navTo : '/'
  },
  {
    label : 'Blog',
    navTo : '/blog'
  },
  {
    label : 'Projects',
    navTo : '/projects'
  },
  
]

export default function NavMenu() {
  return (
    <div className="p-2 fixed">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='rounded-sm p-2 size-12'>
              <Image src={'/bread.svg'} alt='nav' width={40} height={40} className='invert'/>
              <ChevronDown className='size-3'/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-24'>
            <DropdownMenuGroup>
              {listItems.map((item) => (
                <DropdownMenuItem key={item.label} className='*:[svg]:text-muted-foreground' asChild>
                  <Link href={item.navTo} className='text-popover-foreground'>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

