import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitContactInquiry } from "../hooks/useQueries";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Contact() {
  const { mutateAsync, isPending } = useSubmitContactInquiry();
  const headingRef = useScrollAnimation<HTMLDivElement>();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message || !form.projectType) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await mutateAsync({
        id: crypto.randomUUID(),
        name: form.name,
        email: form.email,
        phone: form.phone,
        projectType: form.projectType,
        budget: form.budget || undefined,
        message: form.message,
        timestamp: BigInt(Date.now()),
      });
      toast.success("Your inquiry has been sent. We'll be in touch soon.");
      setForm({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        budget: "",
        message: "",
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headingRef} className="mb-12">
          <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-4">
            Contact
          </h1>
          <div className="border-b border-border" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            data-ocid="contact.dialog"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
                  Name *
                </Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Your full name"
                  required
                  data-ocid="contact.input"
                  className="bg-card border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
                  Email *
                </Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="you@example.com"
                  required
                  data-ocid="contact.input"
                  className="bg-card border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
                  Phone
                </Label>
                <Input
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  placeholder="+91 …"
                  data-ocid="contact.input"
                  className="bg-card border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
                  Project Type *
                </Label>
                <Select
                  value={form.projectType}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, projectType: v }))
                  }
                >
                  <SelectTrigger
                    data-ocid="contact.select"
                    className="bg-card border-border"
                  >
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Institutional">Institutional</SelectItem>
                    <SelectItem value="Urban Design">Urban Design</SelectItem>
                    <SelectItem value="Hospitality">Hospitality</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
                Budget (Optional)
              </Label>
              <Input
                value={form.budget}
                onChange={(e) =>
                  setForm((p) => ({ ...p, budget: e.target.value }))
                }
                placeholder="e.g. ₹50 Lakhs – ₹1 Crore"
                data-ocid="contact.input"
                className="bg-card border-border"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
                Message *
              </Label>
              <Textarea
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                placeholder="Tell us about your project, site, and aspirations…"
                rows={5}
                required
                data-ocid="contact.textarea"
                className="bg-card border-border resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              data-ocid="contact.submit_button"
              className="w-full sm:w-auto font-sans text-sm tracking-widest uppercase border border-foreground px-10 py-3 text-foreground hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
            >
              {isPending && <Loader2 size={14} className="animate-spin" />}
              {isPending ? "Sending…" : "Send Inquiry"}
            </button>
          </form>

          <div className="space-y-10">
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-6">
                de Earth Architects
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    Ragam Apartments, Pipeline Road
                    <br />
                    Patteri, Kozhikode – 673016
                    <br />
                    Kerala, India
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-primary shrink-0" />
                  <a
                    href="mailto:support@deearth.com"
                    className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    support@deearth.com
                  </a>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-primary shrink-0" />
                    <a
                      href="tel:+914952741782"
                      className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      +91 495 274 1782
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-primary shrink-0" />
                    <a
                      href="tel:+919947493333"
                      className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      +91 9947 493 333
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-border overflow-hidden">
              <iframe
                title="de Earth studio location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=75.76%2C11.22%2C75.84%2C11.28&layer=mapnik"
                width="100%"
                height="320"
                style={{ border: 0, display: "block" }}
                loading="lazy"
              />
              <div className="px-4 py-3 bg-muted border-t border-border">
                <a
                  href="https://www.openstreetmap.org/#map=14/11.2588/75.7804"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  View larger map — Kozhikode, Kerala
                </a>
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-3">
                Studio Hours
              </p>
              <p className="font-sans text-sm text-muted-foreground">
                Monday – Friday: 9:30 am – 6:00 pm
                <br />
                Saturday: By appointment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
