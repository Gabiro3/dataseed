import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Legumes from '../public/images/legumes.jpg';
import Tubers from '../public/images/tubers.avif';
import Fruits from '../public/images/fruits.jpg';
import Cereals from '../public/images/wheat.jpg';

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/images/wheat.jpg" alt="Avatar" />
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Cereals</p>
          <p className="text-sm text-muted-foreground">
            e.g. Maize, Corn and Rice.
          </p>
        </div>
        <div className="ml-auto font-medium">19,324</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/public/images/tubers.avif" alt="Avatar" />
          <AvatarFallback>TB</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Tubers & Roots</p>
          <p className="text-sm text-muted-foreground">
            e.g. Potatoes, Cassava and Sweet potatoes
          </p>
        </div>
        <div className="ml-auto font-medium">124,856</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="../public/images/fruits.jpg" alt="Avatar" />
          <AvatarFallback>FR</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Fruits</p>
          <p className="text-sm text-muted-foreground">
            e.g. Apples, Bananas and Mangoes.
          </p>
        </div>
        <div className="ml-auto font-medium">108,295</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="../public/images/fruits.jpg" alt="Avatar" />
          <AvatarFallback>VG</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Vegetables</p>
          <p className="text-sm text-muted-foreground">
            e.g. Tomatoes, Onions and Lettuce.
          </p>
        </div>
        <div className="ml-auto font-medium">162,547</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>OT</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Other</p>
          <p className="text-sm text-muted-foreground">Other crop categories</p>
        </div>
        <div className="ml-auto font-medium">124,940</div>
      </div>
    </div>
  );
}
