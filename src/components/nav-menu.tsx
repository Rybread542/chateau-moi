'use client';
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
import { usePathname } from 'next/navigation'

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

const noNav = ['/', '/admin']

export default function NavMenu() {
  const pathname = usePathname()

  const hide = noNav.some(p => pathname === p || pathname.startsWith(p + '/'))
  if (hide) return null

  return (
    <div className="p-2 z-50 fixed">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' 
                  size='icon' 
                  className="size-10 sm:size-11 rounded-md p-2 bg-background/60 backdrop-blur-sm border border-border/50">
              <Image src={'/bread-icon.svg'} alt='nav' width={40} height={40}/>
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

