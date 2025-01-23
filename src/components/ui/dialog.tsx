import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import {
  FaMagnifyingGlass,
  FaLink,
  FaExpand,
  FaChevronRight,
} from "react-icons/fa6";
import { SlBulb } from "react-icons/sl";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-harrierBLACK/80 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] gap-4 rounded-md border-0 bg-harrierGRAY px-8 py-6 shadow-lg duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="data-[state=open]:text-muted-foreground absolute right-0 top-0 pr-1 pt-1 transition-opacity disabled:pointer-events-none">
        <X className="text-gray-400" size="28" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col sm:flex-row sm:justify-end sm:space-x-20",
      className,
    )}
    {...props}
  />
);

DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "mb-4 text-2xl font-semibold leading-none tracking-tight text-white",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-muted-foreground text-md", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

type TextContentModalProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

const TextContentModal = ({ title, children }: TextContentModalProps) => {
  //   const [trigger, ...content] = React.Children.toArray(children);
  //   console.log({ children });

  return (
    <Dialog>
      <DialogTrigger className="m-0 flex flex-row items-center space-x-2 p-4">
        <SlBulb size="22" className="mr-2 text-harrierYELLOW" />
        <>{title}</>
      </DialogTrigger>
      <DialogContent className="bg-harrierBLACK">
        <DialogHeader>
          <DialogTitle asChild>
            <h5 className="mb-5 flex flex-row justify-center text-3xl">
              <FaMagnifyingGlass size="28" className="mr-4 text-harrierPINK" />
              {title}
            </h5>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="rounded-md border-gray-400 bg-gray-400/10 p-4">
            <div className="m-2 text-harrierWHITE">{children}</div>
          </div>
        </DialogDescription>
        {/* <DialogFooter></DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

const ImageContentModal = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex w-full items-center justify-center py-6">
          <img
            className="m-0 h-auto w-full max-w-3xl cursor-pointer"
            src={src}
            alt={alt}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-7xl bg-harrierBLACK">
        <DialogHeader>
          <DialogTitle asChild>
            <h2>{alt}</h2>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="rounded-md border-gray-400 bg-harrierOFFWHITE p-4">
            <img
              className="max-h-full max-w-full object-contain"
              src={src}
              alt={alt}
            />
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

// type CitationsModalProps = {
//   triggerText: string;
//   href: string;
//   source: string;
//   //   children: React.ReactNode;
// };

// const CitationsModal = ({
//   triggerText,
//   href,
//   source,
//   //   children,
// }: CitationsModalProps) => {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <sup className="cursor-pointer align-super text-xs hover:text-harrierPINK">
//           {triggerText}
//         </sup>
//       </DialogTrigger>
//       <DialogContent className="bg-harrierBLACK">
//         <DialogDescription asChild>
//           <div className="rounded-md border-gray-400 bg-gray-400/10 p-4 text-center">
//             <div className="m-2 flex flex-row text-harrierWHITE">
//               {triggerText}
//               <FaLink size="24" className="mr-4 text-harrierPINK" />
//               <a href={href}>{source}: </a>
//             </div>
//           </div>
//         </DialogDescription>
//         {/* <DialogFooter></DialogFooter> */}
//       </DialogContent>
//     </Dialog>
//   );
// };

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  TextContentModal, // we created these 3 components
  ImageContentModal,
//   CitationsModal,
};
