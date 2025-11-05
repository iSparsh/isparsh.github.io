import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Modern() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-6 bg-background text-foreground">
      <p className="text-3xl">modern</p>
      <Button asChild variant="outline">
        <Link to="/">Return home</Link>
      </Button>
    </div>
  );
}

export default Modern;


