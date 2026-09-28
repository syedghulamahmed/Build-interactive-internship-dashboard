import { FormEvent, useState } from "react";
import type {
  ApplicationErrors,
  ApplicationFormData,
} from "../types/internship";

const initialForm: ApplicationFormData = {
  name: "",
  email: "",
  coverNote: "",
};

function validate(data: ApplicationFormData): ApplicationErrors {
  const errors: ApplicationErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required.";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must contain at least 2 characters.";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.coverNote.trim()) {
    errors.coverNote = "Cover note is required.";
  } else if (data.coverNote.trim().length < 30) {
    errors.coverNote = "Cover note must contain at least 30 characters.";
  }

  return errors;
}

interface ApplyFormProps {
  internshipTitle: string;
}

export function ApplyForm({ internshipTitle }: ApplyFormProps) {
  const [form, setForm] = useState<ApplicationFormData>(initialForm);
  const [errors, setErrors] = useState<ApplicationErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = (
    field: keyof ApplicationFormData,
    value: string,
  ): void => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    // Deliberately local-only: no backend/API call is made.
    setSubmitted(true);
    setForm(initialForm);
  };

  if (submitted) {
    return (
      <div className="success-card" role="status" aria-live="polite">
        <div className="success-icon" aria-hidden="true">✓</div>
        <h2>Application submitted</h2>
        <p>
          Your application for <strong>{internshipTitle}</strong> was saved in
          local component state for this demo.
        </p>
        <button
          className="button secondary"
          type="button"
          onClick={() => setSubmitted(false)}
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form className="apply-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <span className="eyebrow">Take the next step</span>
        <h2>Apply for this internship</h2>
      </div>

      <div className="form-field">
        <label htmlFor="name">Full name</label>
        <input
          id="name"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          placeholder="Your full name"
        />
        {errors.name && <span id="name-error" className="field-error">{errors.name}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          placeholder="you@example.com"
        />
        {errors.email && <span id="email-error" className="field-error">{errors.email}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="coverNote">Cover note</label>
        <textarea
          id="coverNote"
          rows={6}
          value={form.coverNote}
          onChange={(event) => updateField("coverNote", event.target.value)}
          aria-invalid={Boolean(errors.coverNote)}
          aria-describedby={errors.coverNote ? "coverNote-error" : undefined}
          placeholder="Tell the hiring team why you are interested..."
        />
        {errors.coverNote && (
          <span id="coverNote-error" className="field-error">{errors.coverNote}</span>
        )}
      </div>

      <button className="button primary full-width" type="submit">
        Submit application
      </button>

      <p className="form-note">
        Demo only — submissions are stored in local component state.
      </p>
    </form>
  );
}
