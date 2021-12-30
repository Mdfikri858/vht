const fetch = require('node-fetch');
const readlineSync = require('readline-sync');
const chalk = require('chalk');
const fs = require('fs');

const cookie = ''; // Login With Cookie Tinggal masukin saja


const cek = cookie.split('; ');
let csrfToken;
for(let i = 0; i < cek.length; i++){
    const cek2 = cek[i].split('=');
    for(let x = 0; x < 2; x++){
        if(cek2[x] == 'csrftoken'){
            csrfToken = cek2[1];
        }
    }
}

const getMyAddress = () => new Promise((resolve, reject) => {
    fetch('https://shopee.co.id/api/v1/addresses/', {
        headers: {
            'authority': 'shopee.co.id',
            'user-agent': 'Mozilla/5.0 (Linux; Android 9.0; MI 8 SE) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.119 Mobile Safari/537.36',
            'x-api-source': 'rweb',
            'accept': 'application/json',
            'x-shopee-language': 'id',
            'x-requested-with': 'XMLHttpRequest',
            'if-none-match-': '55b03-f8e91769ad7ead76a4674d1ff8db22a5',
            'content-type': 'application/json',
            'x-csrftoken': csrfToken,
            'origin': 'https://shopee.co.id',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'cookie': cookie,
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
        .then(res => res.json())
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(err)
        })
});

const account = () => new Promise((resolve, reject) => {
    fetch(`https://shopee.co.id/api/v1/account_info`, {
        headers: {
            'authority': 'shopee.co.id',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
            'x-shopee-language': 'id',
            'x-requested-with': 'XMLHttpRequest',
            'if-none-match-': '55b03-fd3536b04049e0307ac881f695661960',
            'sec-ch-ua-mobile': '?0',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
            'x-api-source': 'pc',
            'accept': '*/*',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'cookie': cookie
        }
    })
    .then(res => res.json())
    .then(res => {
        resolve(res);
    })
    .catch(err => {
        reject(err)
    })
});

const getDetailFlashsaleItems = (itemId, shopId, fullUrl) => new Promise((resolve, reject) => {
    fetch(`https://shopee.co.id/api/v2/item/get?itemid=${itemId}&shopid=${shopId}`, {
        headers: {
            'authority': 'shopee.co.id',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
            'x-shopee-language': 'id',
            'x-requested-with': 'XMLHttpRequest',
            'if-none-match-': '55b03-fd3536b04049e0307ac881f695661960',
            'sec-ch-ua-mobile': '?0',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
            'x-api-source': 'pc',
            'accept': '*/*',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': fullUrl,
            'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'cookie': cookie
        }
    })
        .then(res => res.json())
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(err)
        })
});

const getLogistik = (shopId, itemId, city, district, state) => new Promise((resolve, reject) => {
	city2 = city.replace(" ", "%20");
	district2 = district.replace(" ", "%20");
	state2 = state.replace(" ", "%20");

    fetch(`https://shopee.co.id/api/v0/shop/${shopId}/item/${itemId}/shipping_info_to_address/?city=${city2}&district=${district2}&state=${state2}`, {
        headers: {
            'authority': 'shopee.co.id',
            'user-agent': 'Mozilla/5.0 (Linux; Android 9.0; MI 8 SE) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.119 Mobile Safari/537.36',
            'x-api-source': 'rweb',
            'accept': 'application/json',
            'x-shopee-language': 'id',
            'x-requested-with': 'XMLHttpRequest',
            'if-none-match-': '55b03-f8e91769ad7ead76a4674d1ff8db22a5',
            'content-type': 'application/json',
            'x-csrftoken': csrfToken,
            'origin': 'https://shopee.co.id',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'cookie': cookie,
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
    .then(res => res.json())
    .then(res => {
        resolve(res);
    })
    .catch(err => {
    	reject(err)
    })
});

const addToCart = (itemId, shopId, fullUrl, modelId) => new Promise((resolve, reject) => {
    fetch('https://shopee.co.id/api/v4/cart/add_to_cart', {
        method: 'POST',
        headers: {
            'authority': 'shopee.co.id',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
            'sec-ch-ua-mobile': '?0',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
            'x-api-source': 'pc',
            'accept': 'application/json',
            'x-shopee-language': 'id',
            'x-requested-with': 'XMLHttpRequest',
            'if-none-match-': '55b03-9073fce4a14cc4082ad4594c84eae590',
            'content-type': 'application/json',
            'x-csrftoken': csrfToken,
            'origin': 'https://shopee.co.id',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': fullUrl,
            'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'cookie': cookie,
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ "quantity": 1, "checkout": true, "update_checkout_only": false, "donot_add_quantity": false, "source": "{\"refer_urls\":[]}", "client_source": 1, "shopid": parseInt(shopId), "itemid": parseInt(itemId), "modelid": parseInt(modelId) })
    })
        .then(res => res.json())
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(err)
        })
});

const dataCheckout = (shopId, itemId, models, adddressId, logistik, pembayaran) => new Promise((resolve, reject) => {
    fetch('https://shopee.co.id/api/v2/checkout/get', {
        method: 'POST',
        headers: {
            'authority': 'shopee.co.id',
            'sec-ch-ua': '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            'dnt': '1',
            'x-cv-id': '106',
            'sec-ch-ua-mobile': '?0',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36',
            'content-type': 'application/json',
            'accept': 'application/json',
            'x-shopee-language': 'id',
            'x-requested-with': 'XMLHttpRequest',
            'if-none-match-': '55b03-97ff6299c31d8127a26fc3100257786c',
            'x-api-source': 'pc',
            'x-csrftoken': csrfToken,
            'sec-ch-ua-platform': '"Windows"',
            'origin': 'https://shopee.co.id',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://shopee.co.id/checkout',
            'accept-language': 'en-US,en;q=0.9,id-ID;q=0.8,id;q=0.7,ar;q=0.6',
            'cookie': cookie,
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: `{"_cft":[3],"shoporders":[{"shop":{"shopid":${shopId}},"items":[{"itemid":${itemId},"modelid":${models},"quantity":1,"add_on_deal_id":null,"is_add_on_sub_item":null,"item_group_id":null,"insurances":[]}]}],"selected_payment_channel_data":{},"promotion_data":{"use_coins":false,"free_shipping_voucher_info":{"free_shipping_voucher_id":0,"disabled_reason":"","description":""},"platform_vouchers":[],"shop_vouchers":[],"check_shop_voucher_entrances":true,"auto_apply_shop_voucher":false},"device_info":{"device_id":"","device_fingerprint":"","tongdun_blackbox":"","buyer_payment_info":{}},"tax_info":{"tax_id":""}}`
    })
    .then(res => res.json())
    .then(res => {
        data = JSON.stringify(res);
        result = data.replace(`{"client_id":0`, `"client_id":0`);
        resolve(`{"status":200,"headers":{},${result}`);
    })
    .catch(err => {
        reject(err)
    })
});

const checkout = (dataCheckouts) => new Promise((resolve, reject) => {
	fetch('https://shopee.co.id/api/v2/checkout/place_order', {
		method: 'POST',
		headers: {
            'authority': 'shopee.co.id',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
            'x-cv-id': '9',
            'sec-ch-ua-mobile': '?0',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
            'content-type': 'application/json',
            'accept': 'application/json',
            'x-shopee-language': 'id',
            'x-requested-with': 'XMLHttpRequest',
            'if-none-match-': '55b03-fbd7448875ab162835dc030b40a9d240',
            'x-api-source': 'pc',
            'x-csrftoken': csrfToken,
            'origin': 'https://shopee.co.id',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://shopee.co.id/checkout',
            'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'cookie': cookie,
            'Content-Type': 'application/json; charset=UTF-8'
		},
		body: dataCheckouts
	})
	.then(res => res.json())
	.then(res => {
		resolve(res);
	})
	.catch(err => {
		reject(err)
	})
});

(async () => {
    try{
        if(!cookie){
            console.log("[!] Cookie tidak boleh kosong");
        }
        console.log(`\n########################################################
# Menu :                                               #
# 1. Run auto add cart & checkout flash sale           #
# 2. Check address                                     #
########################################################`);
        const askTools = readlineSync.question('Pilih menu : ');
        if (askTools == '1') {
            const { addresses } = await getMyAddress();
            if (addresses.length === 0) {
                console.log(`[!] Alamat tidak boleh kosong, silahkan tambahkan alamat.`)
            }
            const info = await account();

            const adddressId = info.default_address.id;
            const city = info.default_address.city;
            const district = info.default_address.district;
            const state = info.default_address.state;

            console.log("\nPilih metode pembayaran:");
            console.log("1. Shopee Pay");
            console.log("2. SeaBank (Dicek Otomatis)");
            console.log("3. Bank BCA (Dicek Otomatis)");
            console.log("4. Bank Mandiri (Dicek Otomatis)");
            console.log("5. Bank BNI (Dicek Otomatis)");
            const plihsk = readlineSync.question(chalk.yellow("[+] Pilih metode (1-5) : "));
            let pembayaran;
            if(plihsk == 1){
                pembayaran = '{channel_id: 8001400, channel_item_option_info: {}, version: 2}';
            } else if(plihsk == 2){
                pembayaran = '{channel_id: 8005200, channel_item_option_info: {option_info: "89052007"}, version: 2}';
            } else if(plihsk == 3){
                pembayaran = '{channel_id: 8005200, channel_item_option_info: {option_info: "89052001"}, version: 2}';
            } else if(plihsk == 4){
                pembayaran = '{channel_id: 8005200, channel_item_option_info: {option_info: "89052002"}, version: 2}';
            } else if(plihsk == 5){
                pembayaran = '{channel_id: 8005200, channel_item_option_info: {option_info: "89052003"}, version: 2}';
            }
    

            const itemsUrl = readlineSync.question(chalk.yellow("\n[+] Masukan url produk : "));
            let titik = itemsUrl.split('.');
            let jumlahtitik;
            for(const [key, value] of Object.entries(titik)) {
                jumlahtitik = key;
            };
            if(jumlahtitik <= 2){
                titik = itemsUrl.split('/');
                for(const [key, value] of Object.entries(titik)) {
                    jumlahtitik = key;
                };
            }
            const itemId = titik[jumlahtitik];
            const shopId = titik[jumlahtitik-1];

            let detailItems = await getDetailFlashsaleItems(itemId, shopId, itemsUrl);
            let pilih;
            
            if(detailItems.item.models.length != 1){
                console.log('\n[ Variant Product ]\n');
                for(let a = 0; a < detailItems.item.models.length; a++) {
                    const bic = detailItems.item.models[a].price/100000;
    
                    var number_string = bic.toString(),
                    split   = number_string.split(','),
                    sisa    = split[0].length % 3,
                    rupiah  = split[0].substr(0, sisa),
                    ribuan  = split[0].substr(sisa).match(/\d{1,3}/gi);
    
                    if (ribuan) {
                        separator = sisa ? '.' : '';
                        rupiah += separator + ribuan.join('.');
                    }
                    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
                    console.log(`${a+1}. Nama : ${detailItems.item.models[a].name}, Harga : ${rupiah}, Stock : ${detailItems.item.models[a].stock}, ID Model : ${detailItems.item.models[a].modelid}`);
                }
                pilih = readlineSync.question(chalk.yellow("\n[+] Pilih Variant Product : "));
            } else {
                pilih = 1;
            }
            const models = detailItems.item.models[pilih-1];
            
            const logix = await getLogistik(shopId, itemId, city, district, state)
            if(!logix.shipping_infos){
                console.log(`[!] Tidak ada ekspedisi yang tersedia`);
            } else {
                let pilih2;
                const jumlog = logix.shipping_infos.length;
                if(jumlog != 1) {
                    console.log('\n[ Ekspedisi Pengiriman ]\n');
                    for(let c = 0; c < jumlog; c++){
                        if(logix.shipping_infos[c].cost_info.estimated_shipping_fee !== 0) {
                            const bil = logix.shipping_infos[c].cost_info.estimated_shipping_fee/100000;
                            var number_string = bil.toString(),
                            split   = number_string.split(','),
                            sisa    = split[0].length % 3,
                            rupiah  = split[0].substr(0, sisa),
                            ribuan  = split[0].substr(sisa).match(/\d{1,3}/gi);
    
                            if (ribuan) {
                                separator = sisa ? '.' : '';
                                rupiah += separator + ribuan.join('.');
                            }
                            rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
                            console.log(`${c+1}. Nama : ${logix.shipping_infos[c].channel.display_name}, Harga : ${rupiah}`);
                        }
                    }
                    pilih2 = readlineSync.question(chalk.yellow("\n[+] Pilih logistik : "));
                } else {
                    pilih2 = 1;
                }
                const logistik = logix.shipping_infos[pilih2-1].channel.channelid;

                let upcomingFlashSale, flashSale;

    			do {
    				upcomingFlashSale = detailItems.item.upcoming_flash_sale;
                    console.log(`[?] Flash sale untuk produk ${chalk.magenta(detailItems.item.name)} belum dimulai.`)
    				if (!upcomingFlashSale) {
    					break;
    				}
    			} while (detailItems = await getDetailFlashsaleItems(itemId, shopId, itemsUrl));        
                
                do {
                    addToCartResult = await addToCart(itemId, shopId, itemsUrl, models.modelid);
                    console.log(chalk.red(`[?] Model ${models.name} gagal terpilih, reason : ${addToCartResult.error_msg}`))
                } while (addToCartResult.error_msg);

                console.log(chalk.green(`[!] Model yang terpilih : ${models.name}`))

                if (addToCartResult.error_msg) {
                    console.log(chalk.red(addToCartResult.error_msg))
                }else{
                    console.log(chalk.green('[+] Berhasil add produk ke cart.'))
                    const dataCheckouts = await dataCheckout(shopId, itemId, models.modelid, adddressId, logistik, pembayaran);

                    let get_checkout;
                    let end;
                    let lp = 0;
                    do{
                        const start = Date.now();
                        get_checkout = await checkout(dataCheckouts);
                        end = Date.now() - start;
                        if(get_checkout.error){
                            console.log("[!] Speed : "+end+" ms [ERROR]");
                        }else{
                            console.log("[!] Speed : "+end+" ms [SUCCESS]");
                            break;
                        }
                        lp++;
                    }while(lp < 3);
                    console.log(get_checkout)
                }        
            }
        } else if (askTools == '2') {
            const { addresses } = await getMyAddress();
            addresses.map((dataAdress, i) => {
                console.log(`\n[${i + 1}] => ${dataAdress.name}, ${dataAdress.phone}, ${dataAdress.address}`)
            });
        } else {
            console.log("[!] Menu yang anda pilih tidak tersedia");
        }
    }catch(err){
        console.log(err);
    }
})();