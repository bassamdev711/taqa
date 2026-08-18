# دليل إعداد مشروع طاقة هوم | TAQA HOME

> وثيقة تقنية كاملة تشرح كيفية إعداد المشروع من الصفر، مع توثيق الأخطاء الشائعة وحلولها.

---

## 📦 المتطلبات

- Node.js 18+
- حساب [Vercel](https://vercel.com) (Hobby أو Pro)
- قاعدة بيانات [Neon](https://neon.tech) (PostgreSQL Serverless)
- حساب [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) لتخزين الصور

---

## ⚙️ متغيرات البيئة المطلوبة

### 1. ملف `.env` (للتطوير المحلي فقط - لا يُرفع لـ GitHub)

```env
# قاعدة البيانات (Neon PostgreSQL)
DATABASE_URL="postgresql://USER:PASSWORD@HOST-pooler.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@HOST.neon.tech/neondb?sslmode=require"

# مصادقة لوحة الإدارة
ADMIN_PASSWORD="your-admin-password"
JWT_SECRET="your-secret-key-min-32-chars"

# تخزين الصور (Vercel Blob)
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."

# تفعيل الكتالوج التجريبي مرة واحدة من Vercel
SEED_DEMO_DATA="false"
```

### 2. متغيرات Vercel (Production) — تُضاف يدوياً من لوحة المشروع

أضف أو تحقق من وجود المتغيرات التالية في **Project → Settings → Environment Variables**:

```text
DATABASE_URL=اتصال PostgreSQL المستخدم في التطبيق
DIRECT_URL=الاتصال المباشر إن كان مزود قاعدة البيانات يوفره
BLOB_READ_WRITE_TOKEN=رمز Vercel Blob إن كانت خاصية رفع الصور مفعلة
SEED_DEMO_DATA=true  # فعّله أثناء تهيئة الكتالوج فقط
```

بعد إضافة `SEED_DEMO_DATA=true`، نفّذ **Redeploy** من صفحة Deployments. راقب السجل حتى تظهر رسالة إتمام seed، ثم عطّل المتغير وأعد النشر مرة أخرى.

> لا تحفظ أي قيمة سرية في GitHub، ولا تستبدل `DATABASE_URL` أو `DIRECT_URL` بقيم تجريبية.

---

## 🗄️ قاعدة البيانات (Prisma + Neon)

### تطبيق تغييرات الـ Schema محلياً أو على Vercel
يستخدم المشروع اتصال `DIRECT_URL` عند توفره، ثم يعود إلى `DATABASE_URL`. على Vercel يجب ضبط `DATABASE_URL`، ويفضل إضافة `DIRECT_URL` إذا كان مزود PostgreSQL يميز بين اتصال pooled واتصال مباشر.

لتطبيق الجداول على قاعدة فارغة أو محدثة:
```bash
npm run db:push
```

لإنشاء كتالوج TAQA HOME التجريبي بعد تطبيق الـ schema:
```bash
npm run db:seed:demo
```

ولتنفيذ الخطوتين معاً مرة واحدة:
```bash
npm run db:bootstrap:demo
```

أمر `npm run build` يشغّل `scripts/prepare-vercel-build.sh` قبل `prisma generate` و`next build`. يطبق هذا السكربت schema تلقائياً عندما تكون متغيرات الاتصال موجودة، ثم يزرع الكتالوج التجريبي فقط إذا كان متغير `SEED_DEMO_DATA=true` مفعلاً في Vercel.

لذلك، إذا كنت تعمل من لوحة Vercel ولا تملك جهازاً محلياً، أضف من **Project → Settings → Environment Variables**:
```text
SEED_DEMO_DATA=true
```
ثم أعد النشر. يجب أن تكون `DATABASE_URL` موجودة مسبقاً، ويفضل إضافة `DIRECT_URL` إذا كان مزود PostgreSQL يوفر اتصالاً مباشراً.

> لا نستخدم `--accept-data-loss` تلقائياً؛ ذلك يحمي بيانات المتجر من تغييرات مدمرة غير مقصودة. يجب تشغيله يدوياً فقط بعد مراجعة Prisma للتغييرات.

> مهم: اترك `SEED_DEMO_DATA` مفعلاً فقط أثناء تهيئة الكتالوج التجريبي. بعد نجاح deployment الأول، عطّله من Vercel ثم أعد النشر، حتى لا يعاد تحديث البيانات التجريبية في كل build لاحق.

---

## 🚀 تشغيل المشروع محلياً

```bash
npm install
npx prisma generate
npm run dev
```

---

## 📁 هيكل المشروع الرئيسي

```
tif/
├── app/
│   ├── admin/
│   │   ├── analytics/      # إحصائيات الموقع والاستهلاك
│   │   ├── branding/       # الهوية البصرية (OG Image, Favicon, QR)
│   │   ├── orders/         # إدارة الطلبات
│   │   ├── products/       # إدارة المنتجات
│   │   └── ...
│   ├── track/              # تتبع الطلبات (برقم الهاتف أو رقم الطلب)
│   └── checkout/           # عملية الشراء
├── components/             # مكونات مشتركة
├── lib/                    # مساعدات (prisma, auth...)
├── prisma/
│   └── schema.prisma       # نموذج قاعدة البيانات
└── public/                 # ملفات ثابتة
```

---

## 🛠️ الأخطاء الشائعة وحلولها

| الخطأ | السبب | الحل |
|-------|-------|------|
| `DIRECT_URL not found` | المتغير غير موجود في Vercel | أضف `DIRECT_URL` في Environment Variables |
| `StoreSettings.ogImageUrl does not exist` | Schema لم يُطبَّق على DB | `prisma db push` سيُشغَّل تلقائياً عند البناء |
| `لا توجد منتجات` بعد نجاح البناء | لم يتم تشغيل seed التجريبي | أضف `SEED_DEMO_DATA=true` في Vercel ثم أعد النشر مرة واحدة |
| `Project not found` في Vercel API | Project ID خاطئ | احصل على ID الصحيح عبر `GET /v9/projects` |

---

## 📞 التواصل
هذا المشروع مبني بـ Next.js 16 + Prisma + Neon + Vercel Blob.
