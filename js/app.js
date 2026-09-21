/**
 * ============================================================================
 * Resit Mudah - Skrip Utama Aplikasi
 * Penjana Resit Berteraskan Privasi (100% Simpanan Tempatan Sahaja)
 * ============================================================================
 */

(function () {
  'use strict';

  // Kunci Storan Tempatan (Local Storage Keys)
  const STORAGE_KEY = 'resit_mudah_app_data';

  // State Utama Aplikasi
  const appState = {
    themeColor: '#0d9488',
    logoBase64: null,
    template: 'standard', // 'standard' | 'thermal'
    business: {
      name: 'Kedai Kopi & Roti Madu',
      regNo: '202301048291 (00345678-X)',
      phone: '+6013-8822991',
      email: 'resit@kopimadu.my',
      address: 'No. 12, Jalan Komersial 2, Bandar Baru Bangi, 43650 Selangor',
      bankInfo: 'Maybank: 5621 8844 1029 (Kafebit Ent)',
      duitNow: 'DuitNow: 013-8822991',
      notes: 'Terima kasih atas pembelian anda! Barangan yang telah dibeli tidak boleh dikembalikan.'
    },
    receipt: {
      receiptNo: 'INV-2026-001',
      date: new Date().toISOString().split('T')[0],
      paymentStatus: 'PAID',
      paymentMethod: 'DuitNow QR',
      custName: 'Ahmad Farhan',
      custPhone: '+6017-9912831'
    },
    items: [
      { id: 1, name: 'Nasi Lemak Ayam Berempah', qty: 2, price: 12.50 },
      { id: 2, name: 'Kopi Ais Kaw', qty: 2, price: 4.00 },
      { id: 3, name: 'Roti Bakar Kaya Butter', qty: 1, price: 4.50 }
    ],
    discount: 0.00,
    taxPercent: 0,
    shipping: 0.00
  };

  // Elemen DOM
  const DOM = {
    // Theme & Logo
    colorSwatches: document.querySelectorAll('.swatch-btn'),
    customColorPicker: document.getElementById('customColorPicker'),
    logoFileInput: document.getElementById('logoFileInput'),
    logoDropZone: document.getElementById('logoDropZone'),
    logoPreviewContainer: document.getElementById('logoPreviewContainer'),
    logoImgPreview: document.getElementById('logoImgPreview'),
    btnRemoveLogo: document.getElementById('btnRemoveLogo'),

    // Business Inputs
    bizName: document.getElementById('bizName'),
    bizRegNo: document.getElementById('bizRegNo'),
    bizPhone: document.getElementById('bizPhone'),
    bizEmail: document.getElementById('bizEmail'),
    bizAddress: document.getElementById('bizAddress'),
    bankInfo: document.getElementById('bankInfo'),
    duitNowQrText: document.getElementById('duitNowQrText'),
    receiptNotes: document.getElementById('receiptNotes'),

    // Receipt Meta Inputs
    receiptNo: document.getElementById('receiptNo'),
    btnGenReceiptNo: document.getElementById('btnGenReceiptNo'),
    receiptDate: document.getElementById('receiptDate'),
    paymentStatus: document.getElementById('paymentStatus'),
    paymentMethod: document.getElementById('paymentMethod'),
    templateSelect: document.getElementById('templateSelect'),
    custName: document.getElementById('custName'),
    custPhone: document.getElementById('custPhone'),

    // Items & Totals Inputs
    itemsTableBody: document.getElementById('itemsTableBody'),
    btnAddItem: document.getElementById('btnAddItem'),
    discountInput: document.getElementById('discountInput'),
    taxInput: document.getElementById('taxInput'),
    shippingInput: document.getElementById('shippingInput'),

    // Preview Elements
    receiptDocument: document.getElementById('receiptDocument'),
    receiptHeaderBar: document.getElementById('receiptHeaderBar'),
    receiptLogoContainer: document.getElementById('receiptLogoContainer'),
    receiptLogoImg: document.getElementById('receiptLogoImg'),
    viewBizName: document.getElementById('viewBizName'),
    viewBizRegNo: document.getElementById('viewBizRegNo'),
    viewBizAddress: document.getElementById('viewBizAddress'),
    viewBizContact: document.getElementById('viewBizContact'),
    viewPaymentStatus: document.getElementById('viewPaymentStatus'),
    viewCustName: document.getElementById('viewCustName'),
    viewCustPhone: document.getElementById('viewCustPhone'),
    viewReceiptNo: document.getElementById('viewReceiptNo'),
    viewReceiptDate: document.getElementById('viewReceiptDate'),
    viewPaymentMethod: document.getElementById('viewPaymentMethod'),
    viewTableBody: document.getElementById('viewTableBody'),
    viewSubtotal: document.getElementById('viewSubtotal'),
    rowDiscount: document.getElementById('rowDiscount'),
    viewDiscount: document.getElementById('viewDiscount'),
    rowTax: document.getElementById('rowTax'),
    labelTax: document.getElementById('labelTax'),
    viewTax: document.getElementById('viewTax'),
    rowShipping: document.getElementById('rowShipping'),
    viewShipping: document.getElementById('viewShipping'),
    viewGrandTotal: document.getElementById('viewGrandTotal'),
    viewBankInfo: document.getElementById('viewBankInfo'),
    viewDuitNow: document.getElementById('viewDuitNow'),
    viewNotes: document.getElementById('viewNotes'),
    badgeTemplateType: document.getElementById('badgeTemplateType'),
    thermalDividers: [
      document.getElementById('thermalDivider1'),
      document.getElementById('thermalDivider2'),
      document.getElementById('thermalDivider3')
    ],

    // Buttons & Actions
    btnPrintTop: document.getElementById('btnPrintTop'),
    btnPrintMain: document.getElementById('btnPrintMain'),
    btnDownloadPdfTop: document.getElementById('btnDownloadPdfTop'),
    btnDownloadPdfPreview: document.getElementById('btnDownloadPdfPreview'),
    btnShareWa: document.getElementById('btnShareWa'),
    btnCopyText: document.getElementById('btnCopyText'),
    btnLoadSample: document.getElementById('btnLoadSample'),
    btnClearForm: document.getElementById('btnClearForm'),
    btnExportJson: document.getElementById('btnExportJson'),
    importJsonInput: document.getElementById('importJsonInput'),
    btnClearAllStorage: document.getElementById('btnClearAllStorage'),

    // Mobile Tabs
    tabBtnForm: document.getElementById('tabBtnForm'),
    tabBtnPreview: document.getElementById('tabBtnPreview'),
    formColumn: document.getElementById('formColumn'),
    previewColumn: document.getElementById('previewColumn'),

    // Toast
    appToast: document.getElementById('appToast'),
    toastMessage: document.getElementById('toastMessage')
  };

  /**
   * 1. PENGURUS TEMA WARNA (THEME MANAGER)
   */
  function applyThemeColor(color, saveToStorage = true) {
    if (!color) return;
    appState.themeColor = color;

    // Tukar HEX ke RGB untuk utility
    const rgb = hexToRgb(color);
    const lightBg = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08)`;
    const hoverColor = adjustBrightness(color, -15);

    // Kemas kini pemboleh ubah CSS
    document.documentElement.style.setProperty('--primary-color', color);
    document.documentElement.style.setProperty('--primary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    document.documentElement.style.setProperty('--primary-hover', hoverColor);
    document.documentElement.style.setProperty('--primary-light', lightBg);

    // Kemas kini visual swatches
    DOM.colorSwatches.forEach(btn => {
      if (btn.getAttribute('data-color').toLowerCase() === color.toLowerCase()) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (DOM.customColorPicker) {
      DOM.customColorPicker.value = color;
    }

    if (saveToStorage) {
      saveStateToLocalStorage();
    }
  }

  function hexToRgb(hex) {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    const num = parseInt(cleanHex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  function adjustBrightness(hex, percent) {
    const rgb = hexToRgb(hex);
    const amount = Math.floor((255 * percent) / 100);
    const clamp = val => Math.min(255, Math.max(0, val + amount));
    const toHex = val => val.toString(16).padStart(2, '0');
    return `#${toHex(clamp(rgb.r))}${toHex(clamp(rgb.g))}${toHex(clamp(rgb.b))}`;
  }

  /**
   * 2. PENGURUS LOGO (LOGO MANAGER)
   */
  function handleLogoUpload(file) {
    if (!file || !file.type.startsWith('image/')) {
      showToast('Sila pilih fail imej yang sah (PNG, JPG, SVG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const originalBase64 = e.target.result;
      
      // Mampatkan imej menggunakan canvas supaya tidak membebankan kuota 5MB localStorage
      compressImage(originalBase64, 400, 200, (compressedBase64) => {
        appState.logoBase64 = compressedBase64;
        updateLogoUI(compressedBase64);
        saveStateToLocalStorage();
        showToast('Logo perniagaan berjaya dimuat naik!');
      });
    };
    reader.readAsDataURL(file);
  }

  function compressImage(base64Str, maxWidth, maxHeight, callback) {
    const img = new Image();
    img.src = base64Str;
    img.onload = function () {
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      callback(canvas.toDataURL('image/png', 0.85));
    };
    img.onerror = function () {
      callback(base64Str);
    };
  }

  function updateLogoUI(base64Url) {
    if (base64Url) {
      DOM.logoImgPreview.src = base64Url;
      DOM.logoPreviewContainer.classList.remove('d-none');
      DOM.logoDropZone.classList.add('d-none');

      DOM.receiptLogoImg.src = base64Url;
      DOM.receiptLogoContainer.classList.remove('d-none');
    } else {
      DOM.logoImgPreview.src = '';
      DOM.logoPreviewContainer.classList.add('d-none');
      DOM.logoDropZone.classList.remove('d-none');

      DOM.receiptLogoImg.src = '';
      DOM.receiptLogoContainer.classList.add('d-none');
    }
  }

  function removeLogo() {
    appState.logoBase64 = null;
    updateLogoUI(null);
    if (DOM.logoFileInput) DOM.logoFileInput.value = '';
    saveStateToLocalStorage();
    showToast('Logo telah dipadam.');
  }

  /**
   * 3. PENGURUS BARIS ITEM (ITEMS MANAGER)
   */
  function renderItemsTable() {
    DOM.itemsTableBody.innerHTML = '';

    appState.items.forEach((item, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <input type="text" class="form-control form-control-sm item-name-input" data-id="${item.id}" value="${escapeHtml(item.name)}" placeholder="Nama item">
        </td>
        <td>
          <input type="number" min="1" step="1" class="form-control form-control-sm text-center item-qty-input" data-id="${item.id}" value="${item.qty}">
        </td>
        <td>
          <input type="number" min="0" step="0.01" class="form-control form-control-sm text-end item-price-input" data-id="${item.id}" value="${item.price.toFixed(2)}">
        </td>
        <td class="text-end fw-semibold pt-2">
          ${formatCurrency(item.qty * item.price)}
        </td>
        <td class="text-center">
          <button type="button" class="btn btn-sm text-danger p-0 btn-delete-item" data-id="${item.id}" title="Padam Baris">
            <i class="bi bi-trash3"></i>
          </button>
        </td>
      `;
      DOM.itemsTableBody.appendChild(tr);
    });

    attachItemRowEventListeners();
    updateLiveReceipt();
  }

  function attachItemRowEventListeners() {
    // Input nama item
    document.querySelectorAll('.item-name-input').forEach(input => {
      input.addEventListener('input', e => {
        const id = parseInt(e.target.getAttribute('data-id'), 10);
        const item = appState.items.find(i => i.id === id);
        if (item) {
          item.name = e.target.value;
          updateLiveReceipt();
        }
      });
    });

    // Input kuantiti
    document.querySelectorAll('.item-qty-input').forEach(input => {
      input.addEventListener('input', e => {
        const id = parseInt(e.target.getAttribute('data-id'), 10);
        const item = appState.items.find(i => i.id === id);
        if (item) {
          item.qty = parseFloat(e.target.value) || 0;
          renderItemsTable();
        }
      });
    });

    // Input harga
    document.querySelectorAll('.item-price-input').forEach(input => {
      input.addEventListener('input', e => {
        const id = parseInt(e.target.getAttribute('data-id'), 10);
        const item = appState.items.find(i => i.id === id);
        if (item) {
          item.price = parseFloat(e.target.value) || 0;
          renderItemsTable();
        }
      });
    });

    // Butang padam baris
    document.querySelectorAll('.btn-delete-item').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        if (appState.items.length <= 1) {
          showToast('Resit memerlukan sekurang-kurangnya 1 item.');
          return;
        }
        appState.items = appState.items.filter(i => i.id !== id);
        renderItemsTable();
      });
    });
  }

  function addNewItem() {
    const newId = appState.items.length > 0 ? Math.max(...appState.items.map(i => i.id)) + 1 : 1;
    appState.items.push({
      id: newId,
      name: 'Item Baharu',
      qty: 1,
      price: 10.00
    });
    renderItemsTable();
  }

  /**
   * 4. PENGIRAAN & PRATONTON RESIT (RECEIPT ENGINE)
   */
  function updateLiveReceipt() {
    // 1. Maklumat Perniagaan
    DOM.viewBizName.textContent = DOM.bizName.value || 'Nama Perniagaan';
    DOM.viewBizRegNo.innerHTML = DOM.bizRegNo.value ? `<span class="text-muted">No. SSM:</span> ${escapeHtml(DOM.bizRegNo.value)}` : '';
    DOM.viewBizAddress.textContent = DOM.bizAddress.value || '';
    
    let contactInfo = [];
    if (DOM.bizPhone.value) contactInfo.push(`Tel: ${DOM.bizPhone.value}`);
    if (DOM.bizEmail.value) contactInfo.push(`Emel: ${DOM.bizEmail.value}`);
    DOM.viewBizContact.textContent = contactInfo.join(' | ');

    // 2. Butiran Resit & Pelanggan
    DOM.viewCustName.textContent = DOM.custName.value || 'Pelanggan Tunai';
    DOM.viewCustPhone.textContent = DOM.custPhone.value || '';
    DOM.viewReceiptNo.textContent = DOM.receiptNo.value || '0000';
    
    // Format tarikh ke DD/MM/YYYY
    const dateVal = DOM.receiptDate.value;
    if (dateVal) {
      const [year, month, day] = dateVal.split('-');
      DOM.viewReceiptDate.textContent = `${day}/${month}/${year}`;
    } else {
      DOM.viewReceiptDate.textContent = '-';
    }

    DOM.viewPaymentMethod.textContent = DOM.paymentMethod.value;

    // Status Bayaran (Pill Badge)
    const statusVal = DOM.paymentStatus.value;
    DOM.viewPaymentStatus.className = 'status-pill';
    if (statusVal === 'PAID') {
      DOM.viewPaymentStatus.classList.add('status-paid');
      DOM.viewPaymentStatus.textContent = 'TELAH DIBAYAR';
    } else if (statusVal === 'UNPAID') {
      DOM.viewPaymentStatus.classList.add('status-unpaid');
      DOM.viewPaymentStatus.textContent = 'BELUM DIBAYAR';
    } else {
      DOM.viewPaymentStatus.classList.add('status-deposit');
      DOM.viewPaymentStatus.textContent = 'DEPOSIT';
    }

    // 3. Render Jadual Resit
    DOM.viewTableBody.innerHTML = '';
    let subtotal = 0;

    appState.items.forEach(item => {
      const lineTotal = item.qty * item.price;
      subtotal += lineTotal;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="text-start">
          <div class="fw-semibold">${escapeHtml(item.name || 'Item')}</div>
        </td>
        <td class="text-center">${item.qty}</td>
        <td class="text-end">${formatCurrency(item.price)}</td>
        <td class="text-end fw-semibold">${formatCurrency(lineTotal)}</td>
      `;
      DOM.viewTableBody.appendChild(tr);
    });

    // 4. Pengiraan Ringkasan (Subtotal, Diskaun, SST, Pos, Grand Total)
    const discount = parseFloat(DOM.discountInput.value) || 0;
    const taxPercent = parseFloat(DOM.taxInput.value) || 0;
    const shipping = parseFloat(DOM.shippingInput.value) || 0;

    const afterDiscount = Math.max(0, subtotal - discount);
    const taxAmount = (afterDiscount * taxPercent) / 100;
    const grandTotal = afterDiscount + taxAmount + shipping;

    DOM.viewSubtotal.textContent = formatCurrency(subtotal);

    // Diskaun
    if (discount > 0) {
      DOM.rowDiscount.classList.remove('d-none');
      DOM.viewDiscount.textContent = `-${formatCurrency(discount)}`;
    } else {
      DOM.rowDiscount.classList.add('d-none');
    }

    // Cukai
    if (taxPercent > 0) {
      DOM.rowTax.classList.remove('d-none');
      DOM.labelTax.textContent = `Cukai (${taxPercent}%):`;
      DOM.viewTax.textContent = formatCurrency(taxAmount);
    } else {
      DOM.rowTax.classList.add('d-none');
    }

    // Pos/Penghantaran
    if (shipping > 0) {
      DOM.rowShipping.classList.remove('d-none');
      DOM.viewShipping.textContent = formatCurrency(shipping);
    } else {
      DOM.rowShipping.classList.add('d-none');
    }

    DOM.viewGrandTotal.textContent = formatCurrency(grandTotal);

    // 5. Bahagian Bawah (Bank, DuitNow & Nota)
    if (DOM.bankInfo.value) {
      DOM.viewBankInfo.classList.remove('d-none');
      DOM.viewBankInfo.innerHTML = `<strong>Bayaran / Akaun:</strong> <span>${escapeHtml(DOM.bankInfo.value)}</span>`;
    } else {
      DOM.viewBankInfo.classList.add('d-none');
    }

    if (DOM.duitNowQrText.value) {
      DOM.viewDuitNow.classList.remove('d-none');
      DOM.viewDuitNow.innerHTML = `<strong>DuitNow:</strong> <span>${escapeHtml(DOM.duitNowQrText.value)}</span>`;
    } else {
      DOM.viewDuitNow.classList.add('d-none');
    }

    DOM.viewNotes.textContent = DOM.receiptNotes.value || '';

    // Simpan profil perniagaan secara automatik
    debouncedAutoSave();
  }

  /**
   * 5. PENYESUAIAN FORMAT TEMPLAT (STANDARD VS POS TERMA)
   */
  function applyTemplate(template) {
    appState.template = template;
    DOM.templateSelect.value = template;

    if (template === 'thermal') {
      DOM.receiptDocument.classList.remove('template-standard');
      DOM.receiptDocument.classList.add('template-thermal');
      DOM.badgeTemplateType.textContent = 'POS Terma (80mm)';
      DOM.receiptHeaderBar.classList.add('d-none');
      DOM.thermalDividers.forEach(el => el.classList.remove('d-none'));
      document.body.classList.add('is-thermal-mode');
    } else {
      DOM.receiptDocument.classList.remove('template-thermal');
      DOM.receiptDocument.classList.add('template-standard');
      DOM.badgeTemplateType.textContent = 'Standard A4/A5';
      DOM.receiptHeaderBar.classList.remove('d-none');
      DOM.thermalDividers.forEach(el => el.classList.add('d-none'));
      document.body.classList.remove('is-thermal-mode');
    }
    saveStateToLocalStorage();
  }

  /**
   * 6. FUNGSI CETAK, SIMPAN PDF, KONGSI & SALIN RINGKASAN
   */
  function triggerPrint() {
    // Pastikan previewColumn dipaparkan dan formColumn disembunyikan sepenuhnya semasa mencetak
    const isMobile = window.innerWidth < 992;
    const prevFormDisplay = DOM.formColumn.style.display;
    const prevPreviewDisplay = DOM.previewColumn.style.display;

    DOM.formColumn.style.display = 'none';
    DOM.previewColumn.style.display = 'block';

    window.print();

    // Pulihkan keadaan paparan selepas dialog cetak ditutup
    setTimeout(() => {
      if (isMobile) {
        DOM.formColumn.style.display = prevFormDisplay || 'block';
        DOM.previewColumn.style.display = prevPreviewDisplay || 'none';
      } else {
        DOM.formColumn.style.display = 'block';
        DOM.previewColumn.style.display = 'block';
      }
    }, 400);
  }

  function downloadPdf() {
    const element = document.getElementById('receiptDocument');
    if (!element) return;

    const rawNo = DOM.receiptNo.value || 'resit';
    const cleanNo = rawNo.trim().replace(/[^a-zA-Z0-9-_]/g, '_');
    const fileName = `Resit-${cleanNo}.pdf`;

    showToast('Sedang menjana fail PDF...');

    const isThermal = appState.template === 'thermal';
    const opt = {
      margin: isThermal ? [2, 2, 2, 2] : [8, 10, 8, 10],
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        scrollY: 0
      },
      jsPDF: {
        unit: 'mm',
        format: isThermal ? [80, 220] : 'a4',
        orientation: 'portrait'
      }
    };

    if (typeof html2pdf !== 'undefined') {
      html2pdf().set(opt).from(element).save().then(() => {
        showToast(`Fail ${fileName} berjaya dimuat turun!`);
      }).catch(err => {
        console.error('Ralat penjanaan PDF:', err);
        showToast('Gagal memuat turun fail PDF. Sila guna Cetak > Save as PDF.');
      });
    } else {
      triggerPrint();
    }
  }

  function shareWhatsApp() {
    const subtotal = appState.items.reduce((sum, item) => sum + (item.qty * item.price), 0);
    const discount = parseFloat(DOM.discountInput.value) || 0;
    const taxPercent = parseFloat(DOM.taxInput.value) || 0;
    const shipping = parseFloat(DOM.shippingInput.value) || 0;
    const grandTotal = Math.max(0, subtotal - discount) + ((Math.max(0, subtotal - discount) * taxPercent) / 100) + shipping;

    let text = `*RESIT PEMBELIAN - ${DOM.bizName.value || 'KEDAI'}*\n`;
    text += `No. Resit: ${DOM.receiptNo.value}\n`;
    text += `Tarikh: ${DOM.viewReceiptDate.textContent}\n`;
    text += `Pelanggan: ${DOM.custName.value || '-'}\n`;
    text += `Status: ${DOM.paymentStatus.value === 'PAID' ? 'TELAH DIBAYAR ✅' : 'BELUM DIBAYAR ⚠️'}\n`;
    text += `--------------------------------\n`;

    appState.items.forEach(item => {
      text += `• ${item.name} (${item.qty}x) = ${formatCurrency(item.qty * item.price)}\n`;
    });

    text += `--------------------------------\n`;
    if (discount > 0) text += `Diskaun: -${formatCurrency(discount)}\n`;
    if (shipping > 0) text += `Penghantaran: ${formatCurrency(shipping)}\n`;
    text += `*JUMLAH KESELURUHAN: ${formatCurrency(grandTotal)}*\n`;
    
    if (DOM.bankInfo.value) text += `\nBayaran ke: ${DOM.bankInfo.value}`;
    if (DOM.duitNowQrText.value) text += `\n${DOM.duitNowQrText.value}`;
    text += `\n\nTerima kasih atas sokongan anda! 🙏`;

    // Buka WhatsApp
    const phoneClean = (DOM.custPhone.value || '').replace(/[^0-9]/g, '');
    const waUrl = phoneClean.length >= 8 
      ? `https://wa.me/${phoneClean}?text=${encodeURIComponent(text)}` 
      : `https://wa.me/?text=${encodeURIComponent(text)}`;

    window.open(waUrl, '_blank');
  }

  function copyTextSummary() {
    const subtotal = appState.items.reduce((sum, item) => sum + (item.qty * item.price), 0);
    const discount = parseFloat(DOM.discountInput.value) || 0;
    const shipping = parseFloat(DOM.shippingInput.value) || 0;
    const grandTotal = Math.max(0, subtotal - discount) + shipping;

    let text = `RESIT RASMI: ${DOM.bizName.value}\n`;
    text += `No: ${DOM.receiptNo.value} | Tarikh: ${DOM.viewReceiptDate.textContent}\n\n`;
    appState.items.forEach(item => {
      text += `${item.qty}x ${item.name} - ${formatCurrency(item.qty * item.price)}\n`;
    });
    text += `\nJUMLAH: ${formatCurrency(grandTotal)}\n`;
    text += `Status: ${DOM.paymentStatus.value}\n`;

    navigator.clipboard.writeText(text).then(() => {
      showToast('Teks resit berjaya disalin ke papan keratan (clipboard)!');
    }).catch(() => {
      showToast('Gagal menyalin teks.');
    });
  }

  function generateNewReceiptNo() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newNo = `INV-${yyyy}${mm}${dd}-${randomSuffix}`;
    DOM.receiptNo.value = newNo;
    updateLiveReceipt();
    showToast(`Nombor resit baharu dijana: ${newNo}`);
  }

  /**
   * 7. PENGURUSAN STORAN (LOCALSTORAGE & JSON BACKUP)
   */
  function saveStateToLocalStorage() {
    const dataToSave = {
      themeColor: appState.themeColor,
      logoBase64: appState.logoBase64,
      template: appState.template,
      business: {
        name: DOM.bizName.value,
        regNo: DOM.bizRegNo.value,
        phone: DOM.bizPhone.value,
        email: DOM.bizEmail.value,
        address: DOM.bizAddress.value,
        bankInfo: DOM.bankInfo.value,
        duitNow: DOM.duitNowQrText.value,
        notes: DOM.receiptNotes.value
      }
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.warn('Gagal menyimpan ke localStorage (mungkin kuota penuh):', e);
    }
  }

  function loadStateFromLocalStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.themeColor) applyThemeColor(parsed.themeColor, false);
        if (parsed.logoBase64) {
          appState.logoBase64 = parsed.logoBase64;
          updateLogoUI(parsed.logoBase64);
        }
        if (parsed.template) applyTemplate(parsed.template);
        if (parsed.business) {
          if (parsed.business.name) DOM.bizName.value = parsed.business.name;
          if (parsed.business.regNo) DOM.bizRegNo.value = parsed.business.regNo;
          if (parsed.business.phone) DOM.bizPhone.value = parsed.business.phone;
          if (parsed.business.email) DOM.bizEmail.value = parsed.business.email;
          if (parsed.business.address) DOM.bizAddress.value = parsed.business.address;
          if (parsed.business.bankInfo) DOM.bankInfo.value = parsed.business.bankInfo;
          if (parsed.business.duitNow) DOM.duitNowQrText.value = parsed.business.duitNow;
          if (parsed.business.notes) DOM.receiptNotes.value = parsed.business.notes;
        }
      }
    } catch (e) {
      console.warn('Gagal membaca data dari localStorage:', e);
    }
  }

  function exportBackupJson() {
    const backupData = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      themeColor: appState.themeColor,
      logoBase64: appState.logoBase64,
      template: appState.template,
      business: {
        name: DOM.bizName.value,
        regNo: DOM.bizRegNo.value,
        phone: DOM.bizPhone.value,
        email: DOM.bizEmail.value,
        address: DOM.bizAddress.value,
        bankInfo: DOM.bankInfo.value,
        duitNow: DOM.duitNowQrText.value,
        notes: DOM.receiptNotes.value
      }
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resit-mudah-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Fail sandaran JSON berjaya dimuat turun!');
  }

  function importBackupJson(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.themeColor) applyThemeColor(parsed.themeColor, true);
        if (parsed.logoBase64) {
          appState.logoBase64 = parsed.logoBase64;
          updateLogoUI(parsed.logoBase64);
        }
        if (parsed.template) applyTemplate(parsed.template);
        if (parsed.business) {
          DOM.bizName.value = parsed.business.name || '';
          DOM.bizRegNo.value = parsed.business.regNo || '';
          DOM.bizPhone.value = parsed.business.phone || '';
          DOM.bizEmail.value = parsed.business.email || '';
          DOM.bizAddress.value = parsed.business.address || '';
          DOM.bankInfo.value = parsed.business.bankInfo || '';
          DOM.duitNowQrText.value = parsed.business.duitNow || '';
          DOM.receiptNotes.value = parsed.business.notes || '';
        }
        saveStateToLocalStorage();
        updateLiveReceipt();
        showToast('Data sandaran JSON berjaya dipulihkan!');
      } catch (err) {
        showToast('Format fail JSON tidak sah atau rosak.');
      }
    };
    reader.readAsText(file);
  }

  function clearAllStoredData() {
    if (confirm('Adakah anda pasti ingin memadam semua data tersimpan di pelayar ini? Tindakan ini tidak boleh diundur.')) {
      localStorage.removeItem(STORAGE_KEY);
      removeLogo();
      applyThemeColor('#0d9488', false);
      loadSampleData();
      showToast('Semua data storan pelayar telah dikosongkan.');
    }
  }

  function loadSampleData() {
    DOM.bizName.value = 'Kedai Kopi & Roti Madu';
    DOM.bizRegNo.value = '202301048291 (00345678-X)';
    DOM.bizPhone.value = '+6013-8822991';
    DOM.bizEmail.value = 'resit@kopimadu.my';
    DOM.bizAddress.value = 'No. 12, Jalan Komersial 2, Bandar Baru Bangi, 43650 Selangor';
    DOM.bankInfo.value = 'Maybank: 5621 8844 1029 (Kafebit Ent)';
    DOM.duitNowQrText.value = 'DuitNow: 013-8822991';
    DOM.receiptNotes.value = 'Terima kasih atas pembelian anda! Barangan yang telah dibeli tidak boleh dikembalikan.';
    DOM.custName.value = 'Ahmad Farhan';
    DOM.custPhone.value = '+6017-9912831';
    DOM.receiptNo.value = 'INV-2026-001';
    DOM.discountInput.value = '0.00';
    DOM.taxInput.value = '0';
    DOM.shippingInput.value = '0.00';

    appState.items = [
      { id: 1, name: 'Nasi Lemak Ayam Berempah', qty: 2, price: 12.50 },
      { id: 2, name: 'Kopi Ais Kaw', qty: 2, price: 4.00 },
      { id: 3, name: 'Roti Bakar Kaya Butter', qty: 1, price: 4.50 }
    ];
    renderItemsTable();
    showToast('Contoh data perniagaan berjaya dimuatkan!');
  }

  function clearFormFields() {
    if (confirm('Kosongkan semua baris item dan pelanggan untuk memulakan resit baharu?')) {
      DOM.custName.value = '';
      DOM.custPhone.value = '';
      DOM.discountInput.value = '0.00';
      DOM.taxInput.value = '0';
      DOM.shippingInput.value = '0.00';
      generateNewReceiptNo();

      appState.items = [
        { id: 1, name: '', qty: 1, price: 0.00 }
      ];
      renderItemsTable();
      showToast('Borang resit sedia untuk transaksi baharu.');
    }
  }

  /**
   * 8. UTILITI BANTUAN (HELPERS)
   */
  function formatCurrency(amount) {
    const num = isNaN(amount) ? 0 : amount;
    return `RM ${num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
  }

  let autoSaveTimeout = null;
  function debouncedAutoSave() {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
      saveStateToLocalStorage();
    }, 600);
  }

  function showToast(message) {
    if (!DOM.appToast) return;
    DOM.toastMessage.textContent = message;
    const toast = new bootstrap.Toast(DOM.appToast, { delay: 2800 });
    toast.show();
  }

  /**
   * 9. PERSEDIAAN ACARA (EVENT LISTENERS)
   */
  function setupEventListeners() {
    // Pertukaran warna tema (Swatches)
    DOM.colorSwatches.forEach(btn => {
      btn.addEventListener('click', () => {
        const color = btn.getAttribute('data-color');
        applyThemeColor(color);
      });
    });

    // Custom Color Picker
    DOM.customColorPicker.addEventListener('input', e => {
      applyThemeColor(e.target.value);
    });

    // Logo Upload Input
    DOM.logoFileInput.addEventListener('change', e => {
      if (e.target.files && e.target.files[0]) {
        handleLogoUpload(e.target.files[0]);
      }
    });

    // Drag and drop logo
    DOM.logoDropZone.addEventListener('dragover', e => {
      e.preventDefault();
      DOM.logoDropZone.style.borderColor = 'var(--primary-color)';
    });

    DOM.logoDropZone.addEventListener('dragleave', e => {
      e.preventDefault();
      DOM.logoDropZone.style.borderColor = '#cbd5e1';
    });

    DOM.logoDropZone.addEventListener('drop', e => {
      e.preventDefault();
      DOM.logoDropZone.style.borderColor = '#cbd5e1';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleLogoUpload(e.dataTransfer.files[0]);
      }
    });

    // Padam logo
    DOM.btnRemoveLogo.addEventListener('click', removeLogo);

    // Tambah item
    DOM.btnAddItem.addEventListener('click', addNewItem);

    // Input reaktif untuk butiran perniagaan dan resit
    const inputsToWatch = [
      DOM.bizName, DOM.bizRegNo, DOM.bizPhone, DOM.bizEmail, DOM.bizAddress,
      DOM.receiptNo, DOM.receiptDate, DOM.paymentStatus, DOM.paymentMethod,
      DOM.custName, DOM.custPhone, DOM.bankInfo, DOM.duitNowQrText, DOM.receiptNotes,
      DOM.discountInput, DOM.taxInput, DOM.shippingInput
    ];

    inputsToWatch.forEach(input => {
      input.addEventListener('input', updateLiveReceipt);
      input.addEventListener('change', updateLiveReceipt);
    });

    // Format Templat Select
    DOM.templateSelect.addEventListener('change', e => {
      applyTemplate(e.target.value);
    });

    // Butang Jana No Resit
    DOM.btnGenReceiptNo.addEventListener('click', generateNewReceiptNo);

    // Tindakan Utama (Cetak, Simpan PDF, Kongsi, Salin, Muat Contoh, Kosongkan)
    DOM.btnPrintTop.addEventListener('click', triggerPrint);
    DOM.btnPrintMain.addEventListener('click', triggerPrint);
    if (DOM.btnDownloadPdfTop) DOM.btnDownloadPdfTop.addEventListener('click', downloadPdf);
    if (DOM.btnDownloadPdfPreview) DOM.btnDownloadPdfPreview.addEventListener('click', downloadPdf);
    DOM.btnShareWa.addEventListener('click', shareWhatsApp);
    DOM.btnCopyText.addEventListener('click', copyTextSummary);
    DOM.btnLoadSample.addEventListener('click', loadSampleData);
    DOM.btnClearForm.addEventListener('click', clearFormFields);

    // Pengendalian Pintas Cetakan Pelayar (Ctrl+P / Command+P)
    window.addEventListener('beforeprint', () => {
      DOM.formColumn.style.display = 'none';
      DOM.previewColumn.style.display = 'block';
    });

    window.addEventListener('afterprint', () => {
      if (window.innerWidth < 992) {
        if (DOM.tabBtnForm.classList.contains('btn-primary-custom')) {
          DOM.formColumn.style.display = 'block';
          DOM.previewColumn.style.display = 'none';
        } else {
          DOM.formColumn.style.display = 'none';
          DOM.previewColumn.style.display = 'block';
        }
      } else {
        DOM.formColumn.style.display = 'block';
        DOM.previewColumn.style.display = 'block';
      }
    });

    // Pengurusan JSON Data
    DOM.btnExportJson.addEventListener('click', exportBackupJson);
    DOM.importJsonInput.addEventListener('change', e => {
      if (e.target.files && e.target.files[0]) {
        importBackupJson(e.target.files[0]);
      }
    });
    DOM.btnClearAllStorage.addEventListener('click', clearAllStoredData);

    // Navigasi Tab Mudah Alih (Mobile Screens)
    DOM.tabBtnForm.addEventListener('click', () => {
      DOM.tabBtnForm.classList.add('btn-primary-custom');
      DOM.tabBtnForm.classList.remove('btn-outline-secondary');
      DOM.tabBtnPreview.classList.add('btn-outline-secondary');
      DOM.tabBtnPreview.classList.remove('btn-primary-custom');

      DOM.formColumn.style.display = 'block';
      DOM.previewColumn.style.display = 'none';
    });

    DOM.tabBtnPreview.addEventListener('click', () => {
      DOM.tabBtnPreview.classList.add('btn-primary-custom');
      DOM.tabBtnPreview.classList.remove('btn-outline-secondary');
      DOM.tabBtnForm.classList.add('btn-outline-secondary');
      DOM.tabBtnForm.classList.remove('btn-primary-custom');

      DOM.formColumn.style.display = 'none';
      DOM.previewColumn.style.display = 'block';
    });

    // Pengendalian Resize Tetingkap untuk Tab Mudah Alih
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 992) {
        DOM.formColumn.style.display = 'block';
        DOM.previewColumn.style.display = 'block';
      } else {
        // Kekalkan paparan aktif di skrin kecil
        if (DOM.tabBtnForm.classList.contains('btn-primary-custom')) {
          DOM.formColumn.style.display = 'block';
          DOM.previewColumn.style.display = 'none';
        } else {
          DOM.formColumn.style.display = 'none';
          DOM.previewColumn.style.display = 'block';
        }
      }
    });
  }

  /**
   * 10. INISIALISASI APLIKASI (INIT)
   */
  function init() {
    // Tetapkan tarikh hari ini secara lalai
    DOM.receiptDate.value = new Date().toISOString().split('T')[0];

    // Muat data dari storan setempat (jika ada)
    loadStateFromLocalStorage();

    // Pastikan tema dan logo diselaraskan
    applyThemeColor(appState.themeColor, false);
    if (appState.logoBase64) {
      updateLogoUI(appState.logoBase64);
    }

    // Bina jadual item permulaan
    renderItemsTable();

    // Persediaan event listeners
    setupEventListeners();

    // Tetapkan paparan responsif awal
    if (window.innerWidth < 992) {
      DOM.previewColumn.style.display = 'none';
    }
  }

  // Jalankan apabila DOM sedia
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
