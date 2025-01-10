import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

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
        "fixed left-[50%] top-[50%] z-50 w-full max-w-7xl translate-x-[-50%] translate-y-[-50%] gap-4 rounded-md border-0 bg-harrierGRAY px-8 py-6 shadow-lg duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
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

const TextContentModal = ({
  title,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  const [trigger, ...content] = React.Children.toArray(children);

  return (
    <Dialog>
      <DialogTrigger className="m-0 flex flex-row items-center space-x-2 p-4">
        {trigger}
      </DialogTrigger>
      <DialogContent className="bg-harrierBLACK">
        <DialogHeader>
          <DialogTitle asChild>
            <h2>{title}</h2>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="rounded-md border-gray-400 bg-gray-400/10 p-4">
            <p className="m-0 text-gray-200">{content}</p>
          </div>
        </DialogDescription>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ImageContentModal = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <img
          className="m-0 cursor-pointer"
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "800px",
          }}
        />
      </DialogTrigger>
      <DialogContent className="bg-harrierBLACK">
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
  TextContentModal, // we created these 2 components
  ImageContentModal,
};
