import Link from "@/components/link";

const Footer = () => {
  return (
    <div className="flex w-full items-center justify-between border-border border-t pt-2 ">
      <div className="flex gap-7 px-[2px] text-muted">
        <Link href="https://x.com/khushfyi" text="X " underline />
        <Link href="https://www.instagram.com/khush.fyi/" text="Instagram " underline />
        <Link href="https://www.linkedin.com/in/kptls/" text="LinkedIn " underline />
      </div>
      <div className="text-muted">
      <Link href="mailto:khussshpatel@gmail.com" text="Email" underline />
      </div>
    </div>
  );
};

export { Footer };
