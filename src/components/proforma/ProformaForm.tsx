"use client";

import { useActionState, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  submitProformaAction,
  type ProformaState,
} from "@/app/actions/proforma";

const initialState: ProformaState = { status: "idle" };

interface ProductOption {
  id: string;
  name: string;
  brandName: string;
}

interface ProformaFormProps {
  products: ProductOption[];
  initialProductId?: string;
  defaultFullName?: string;
  defaultEmail?: string;
}

interface ProformaLineRowProps {
  id: string;
  products: ProductOption[];
  index: number;
  defaultProductId?: string;
  onRemove: () => void;
  canRemove: boolean;
}

function groupByBrand(products: ProductOption[]) {
  const groups = new Map<string, ProductOption[]>();
  for (const product of products) {
    const list = groups.get(product.brandName) ?? [];
    list.push(product);
    groups.set(product.brandName, list);
  }
  return Array.from(groups.entries());
}

function ProformaLineRow({
  id,
  products,
  index,
  defaultProductId,
  onRemove,
  canRemove,
}: ProformaLineRowProps) {
  const t = useTranslations("Proforma");
  const [selected, setSelected] = useState(defaultProductId || "");
  const brandGroups = groupByBrand(products);

  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-primary">
          {t("lineLabel", { index: index + 1 })}
        </p>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-xs font-medium text-red-600 hover:underline"
          >
            {t("removeLine")}
          </button>
        )}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor={`product-select-${id}`}
            className="block text-sm font-medium text-text"
          >
            {t("productLabel")}
          </label>
          <select
            id={`product-select-${id}`}
            name={`product_${id}`}
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-border bg-surface-alt px-3.5 py-2.5 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
          >
            <option value="">{t("productPlaceholder")}</option>
            <option value="autre">{t("autreOption")}</option>
            {brandGroups.map(([brandName, brandProducts]) => (
              <optgroup key={brandName} label={brandName}>
                {brandProducts.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {selected === "autre" && (
          <div className="sm:col-span-2">
            <label
              htmlFor={`freetext-${id}`}
              className="block text-sm font-medium text-text"
            >
              {t("freeTextLabel")}
            </label>
            <input
              type="text"
              id={`freetext-${id}`}
              name={`freeText_${id}`}
              maxLength={200}
              placeholder={t("freeTextPlaceholder")}
              className="mt-1.5 w-full rounded-md border border-border bg-surface-alt px-3.5 py-2.5 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
            />
          </div>
        )}

        <div>
          <label
            htmlFor={`reference-${id}`}
            className="block text-sm font-medium text-text"
          >
            {t("referenceLabel")}
          </label>
          <input
            type="text"
            id={`reference-${id}`}
            name={`reference_${id}`}
            maxLength={100}
            className="mt-1.5 w-full rounded-md border border-border bg-surface-alt px-3.5 py-2.5 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
          />
        </div>

        <div>
          <label
            htmlFor={`quantity-${id}`}
            className="block text-sm font-medium text-text"
          >
            {t("quantityLabel")}
          </label>
          <input
            type="number"
            id={`quantity-${id}`}
            name={`quantity_${id}`}
            min={1}
            max={999}
            defaultValue={1}
            className="mt-1.5 w-full rounded-md border border-border bg-surface-alt px-3.5 py-2.5 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
          />
        </div>
      </div>
    </div>
  );
}

export default function ProformaForm({
  products,
  initialProductId,
  defaultFullName,
  defaultEmail,
}: ProformaFormProps) {
  const t = useTranslations("Proforma");
  const [state, formAction, isPending] = useActionState(
    submitProformaAction,
    initialState,
  );
  const nextId = useRef(1);
  const [lineIds, setLineIds] = useState<string[]>(["line-0"]);

  function addLine() {
    setLineIds((ids) => [...ids, `line-${nextId.current++}`]);
  }

  function removeLine(id: string) {
    setLineIds((ids) => (ids.length > 1 ? ids.filter((i) => i !== id) : ids));
  }

  return (
    <form action={formAction} noValidate className="space-y-8">
      <input type="hidden" name="lineIds" value={lineIds.join(",")} />

      <div>
        <h2 className="text-lg font-semibold text-primary">
          {t("sectionProducts")}
        </h2>
        <div className="mt-4 space-y-4">
          {lineIds.map((id, index) => (
            <ProformaLineRow
              key={id}
              id={id}
              index={index}
              products={products}
              defaultProductId={index === 0 ? initialProductId : undefined}
              onRemove={() => removeLine(id)}
              canRemove={lineIds.length > 1}
            />
          ))}
        </div>
        {state.status === "error" && state.errors?.lines && (
          <p className="mt-2 text-xs text-red-600">{t("errorLines")}</p>
        )}
        <button
          type="button"
          onClick={addLine}
          className="mt-4 rounded-md border border-secondary px-4 py-2 text-sm font-medium text-secondary hover:bg-secondary hover:text-surface-alt transition-colors"
        >
          {t("addLine")}
        </button>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-primary">
          {t("sectionContact")}
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-text">
              {t("fullNameLabel")}
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              minLength={2}
              maxLength={120}
              defaultValue={defaultFullName}
              className="mt-1.5 w-full rounded-md border border-border bg-surface-alt px-3.5 py-2.5 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
            />
            {state.errors?.fullName && (
              <p className="mt-1 text-xs text-red-600">{t("errorFullName")}</p>
            )}
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-text">
              {t("companyLabel")}
            </label>
            <input
              type="text"
              id="company"
              name="company"
              maxLength={160}
              className="mt-1.5 w-full rounded-md border border-border bg-surface-alt px-3.5 py-2.5 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text">
              {t("emailLabel")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              defaultValue={defaultEmail}
              className="mt-1.5 w-full rounded-md border border-border bg-surface-alt px-3.5 py-2.5 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
            />
            {state.errors?.email && (
              <p className="mt-1 text-xs text-red-600">{t("errorEmail")}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-text">
              {t("phoneLabel")}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              dir="ltr"
              className="mt-1.5 w-full rounded-md border border-border bg-surface-alt px-3.5 py-2.5 text-sm text-text text-start focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
            />
            {state.errors?.phone && (
              <p className="mt-1 text-xs text-red-600">{t("errorPhone")}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="notes" className="block text-sm font-medium text-text">
              {t("notesLabel")}
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              maxLength={2000}
              placeholder={t("notesPlaceholder")}
              className="mt-1.5 w-full rounded-md border border-border bg-surface-alt px-3.5 py-2.5 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-primary-dark transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? t("submitting") : t("submit")}
      </button>

      {state.status === "success" && (
        <p role="status" className="rounded-md border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary-dark">
          {t("success")}
        </p>
      )}
    </form>
  );
}
