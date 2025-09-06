import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

/* -------------------- Schema -------------------- */
const kv = z.object({
  key: z.string().min(1, "Field name required"),
  value: z.string().min(1, "Field value required"),
});

const schema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  dob: z.string().optional(),
  height: z.string().optional(),
  customFields: z.array(kv).optional(),
});

/* -------------------- Component -------------------- */
export default function BiodataForm({ onChange }) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", customFields: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "customFields",
  });

  const values = watch();

  // Persist draft + notify parent
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("biodataDraft", JSON.stringify(values));
      if (onChange) onChange(values);
    }, 300);
    return () => clearTimeout(timeout);
  }, [values, onChange]);

  // Load saved draft once
  useEffect(() => {
    const saved = localStorage.getItem("biodataDraft");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        Object.entries(parsed).forEach(([k, v]) =>
          setValue(k, v, { shouldValidate: false })
        );
      } catch (e) {
        console.error("Failed to parse saved draft:", e);
      }
    }
  }, [setValue]);

  return (
    <form
      onSubmit={handleSubmit(() => null)}
      className="space-y-6 p-8 bg-white rounded-3xl shadow-xl border max-w-xl mx-auto mt-8"
    >
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Marriage Biodata Form
      </h2>

      {/* Full Name */}
      <div className="form-group">
        <label className="block text-gray-700 font-medium">Full Name *</label>
        <input
          {...register("fullName")}
          placeholder="e.g. Arjun Sharma"
          className={`mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm ${
            errors.fullName ? "border-red-500" : ""
          }`}
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      {/* Date of Birth */}
      <div className="form-group">
        <label className="block text-gray-700 font-medium">Date of Birth</label>
        <input
          type="date"
          {...register("dob")}
          className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
        />
      </div>

      {/* Height */}
      <div className="form-group">
        <label className="block text-gray-700 font-medium">Height</label>
        <input
          {...register("height")}
          placeholder="e.g. 5 ft 8 in"
          className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
        />
      </div>

      {/* Custom Fields */}
      <div className="form-group">
        <h3 className="text-gray-800 font-semibold mb-3">Custom Fields</h3>
        <div className="space-y-2">
          {fields.map((item, idx) => (
            <div
              key={item.id}
              className="flex gap-2 items-center border p-2 rounded-lg shadow-sm"
            >
              <input
                {...register(`customFields.${idx}.key`)}
                placeholder="Field"
                className="flex-1 border rounded-md p-2 focus:ring-2 focus:ring-blue-400"
              />
              <input
                {...register(`customFields.${idx}.value`)}
                placeholder="Value"
                className="flex-1 border rounded-md p-2 focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => remove(idx)}
                className="text-red-600 font-bold text-xl hover:text-red-800"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => append({ key: "", value: "" })}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Add Field
        </button>
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-700 transition mt-4"
      >
        Save Biodata
      </button>
    </form>
  );
}
