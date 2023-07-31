/**
 * מחלקה ליצירת גלרייה
 * @param elemId מקבל את המזהה שבו נשים את הגלרייה
 * @param images שמות של תמונות שיוצגו בגלרייה
 */
class Gallery {
    constructor(elemId, ...images) {
        // שם את שמות התמונות שקיבלנו בתוך המחלקה
        this.images = images;
        // חיבור לאלמנט של הגלרייה (לפי שם המזהה שקיבלנו)
        const galleryElem = document.getElementById(elemId);

        // מייצר אלמנט של תמונה
        this.imgElem = document.createElement('img');
        // נרשם לאירועים שיפעילו את הגלרייה
        // (בלחיצה על העכבר הגלרייה תתקדם)
        this.imgElem.addEventListener('click', () => this.nextImage());
        // (בלחיצה על המקש הימני בעכבר הגלרייה תלך אחורה)
        this.imgElem.addEventListener('contextmenu', ev => {
            // מבטל את הפתיחת התפריט בלחיצה על הלחצן הימני
            ev.preventDefault();
            this.prevImage();
        });

        // מוסיף את התמונה לתוך האלמנט המבוקש
        galleryElem.appendChild(this.imgElem);
        // מפעיל את הגלרייה בפעם הראשונה (ע"מ שתוצג תמונה)
        this.nextImage();
    }

    // האלמנט של התמונה
    imgElem;
    // מערך של כל שמות התמונות
    images = [];
    // מיקום הגלרייה (איזו תמונה להציג)
    currentImage = -1;

    // מעבר לתמונה הבאה
    nextImage() {
        // מקדם את המיקום ב-1
        this.currentImage++;

        // אם מיקום התמונה גדול או שווה לאורך המערך, מחזירים את המיקום ל-0 (מתחילים מהתחלה)
        if (this.currentImage >= this.images.length) {
            this.currentImage = 0;
        }

        // מחליפים את התמונה בגלרייה לפי המיקום החדש
        this.imgElem.src = `images/${this.images[this.currentImage]}`;
    }

    prevImage() {
        // מפחיתים את המיקום ב-1
        this.currentImage--;

        // אם המיקום קטן מ-0 מחזירים את המיקום לסוף המערך (פחות 1)
        if (this.currentImage < 0) {
            this.currentImage = this.images.length - 1;
        }

        // מחליפים את התמונה בגלרייה לפי המיקום החדש
        this.imgElem.src = `images/${this.images[this.currentImage]}`;
    }
}

// יצרנו 3 גלריות באמצעות הקלאס של הגלרייה
const gallery1 = new Gallery("gallery1", "תמונה (1).jpg", "תמונה (5).jpg", "תמונה (3).webp");

const gallery2 = new Gallery("gallery2", "תמונה (2).jpg", "תמונה (4).avif", "תמונה (6).png");


// פונקציה חיצונית שיודעת להשתמש בגלריות שהוגדרו ולעבור לתמונה הבאה
function nextAll() {
    gallery1.nextImage();
    gallery2.nextImage();
}

function prevAll() {
    gallery1.prevImage();
    gallery2.prevImage();
}

function nextImage1() {
    gallery1.nextImage();
}

function prevImage1() {
    gallery1.prevImage();
}

function nextImage2() {
    gallery2.nextImage();
}

function prevImage2() {
    gallery2.prevImage();
}