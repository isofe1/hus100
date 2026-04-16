import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const RAW = {"classes":[{"name":"الفصل الاول: الثرموداينمك","lectures":[{"duration":"1:02:25","title":"محاضرة 1","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/spmP4Cwd5lo1hzqLz8ZsyQFnxOCK2ya3_720p.mp4"},{"duration":"53:16","title":"محاضرة 2","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/y7A4XJmRuzmmbdz4FRTzEWet6DCjfd84_720p.mp4"},{"duration":"1:06:48","title":"محاضرة 3","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/CUFMtmZr0RJcM9hOhulW1w2i5DgbOnAP_720p.mp4"},{"duration":"1:01:28","title":"محاضرة 4","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/iPDCaqItYzG71GjXi2jIqDZiPXmqBVkT_720p.mp4"},{"duration":"51:46","title":"محاضرة 5","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/oYACKGfhxRcgEuIPHh4UX0IM4IbU6U8i_720p.mp4"},{"duration":"27:32","title":"محاضرة 6","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/qIn5lICV15WA1RamXPnA8HsvHn4v0sEn_720p.mp4"},{"duration":"1:12:08","title":"محاضرة 7","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/CGDiuaqylpGp3aKmY3NUi6h9Nunto86z_720p.mp4"},{"duration":"1:01:58","title":"محاضرة 8","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/KuD3lzVsZEuhYS1Nj0INQdsIFapJxjgC_720p.mp4"},{"duration":"28:46","title":"محاضرة 9","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/Cy8PdEKGO5oD5cHTUu0d2HfCSMigFoza_720p.mp4"},{"duration":"1:01:26","title":"محاضرة 10","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/lA50o3YXDxIkv383bYgnefb1v6LmwvvU_720p.mp4"},{"duration":"1:05:11","title":"محاضرة 11","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/097CPkGG1jXzpWsAkr5Rv9snPIU1aN1e_720p.mp4"},{"duration":"1:06:10","title":"محاضرة 12","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/pa6g8kRPY7zfOLDm7dOFjf9CCdkTurW7_720p.mp4"},{"duration":"49:09","title":"محاضرة 13","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/P9uv2z6H4Mndcvw1p2ua15bhiJTEXVhI_720p.mp4"},{"duration":"57:23","title":"محاضرة 14","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/7Ku1JrMPCw5awqDhugEN8lo07gn2auuG_720p.mp4"},{"duration":"21:51","title":"محاضرة 15","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/li5B2o9YmKrcWhTn2tDVKxxaBKW4nLLz_720p.mp4"},{"duration":"46:38","title":"محاضرة 16","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/5EixVeOe758Jk1mbhbZYeqsH2eVwgRch_720p.mp4"},{"duration":"44:32","title":"محاضرة 17","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/5zGj7UpaNSVAGUvyH4OpuuUayh7q1nmk_720p.mp4"},{"duration":"1:27:30","title":"محاضرة 18","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/Ex4hipPKhF0KwFtMrdbZVody7d6mCKQ2_720p.mp4"},{"duration":"50:06","title":"محاضرة 19","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/iqrYmhvuMupHjSKezLtpWw0vsfnx8CCU_720p.mp4"},{"duration":"48:35","title":"محاضرة 20","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/qtba2AFMNXPK8im3Hl5WIS03rbJ9PyUE_720p.mp4"},{"duration":"36:01","title":"محاضرة 21","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/1EhDodwqWH5GGRhrCdaMpvKGXByJjh8r_720p.mp4"},{"duration":"38:55","title":"محاضرة 22","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/B9UZERNp5gNqcCGh94CZfYligNG22Tfs_720p.mp4"},{"duration":"49:06","title":"محاضرة 23","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/CmRM3Wlwsx9CYtvOm0kFrF4YzP0b1Vqg_720p.mp4"},{"duration":"59:57","title":"محاضرة 24","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/xKJSy3sD4NXUnC9fOy9tC6hF1Jd3O4Dm_720p.mp4"},{"duration":"42:39","title":"محاضرة 25","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/cDsP8RZWzb5BLTidIJpbbmiV0ZoFbDRD_720p.mp4"},{"duration":"27:48","title":"محاضرة 26","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/8c5q6jsYdKn2iJmsZtp5RFRIOT6qq8Qc_720p.mp4"},{"duration":"1:17:07","title":"محاضرة 27","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/8gNAs8brzj59fGKHQBIQVXzYox08k50O_720p.mp4"},{"duration":"45:03","title":"محاضرة 28","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/ytAO4AkBtWY4nMUx05i9QzcUU58qYFU6_720p.mp4"},{"duration":"1:32:56","title":"محاضرة 29","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/y492B6G6PW2rXPZsOrmK1YiTPY5onAxZ_720p.mp4"},{"duration":"40:57","title":"محاضرة 30","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/Z7pAC2htIBwIQSQONm7E8CQ62VNH73gZ_720p.mp4"},{"duration":"58:51","title":"محاضرة 31","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/1hkWyv48HJZmNH3Ckde7JxFJvXVXuj2V_720p.mp4"},{"duration":"26:29","title":"محاضرة 32","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/iagx98Thp2dmE4mvCsWWshCgFbGmnxkp_720p.mp4"},{"duration":"56:00","title":"محاضرة 33","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/vVnMCUDd1vqa5ugW66ssiIh22COkTrmi_720p.mp4"},{"duration":"54:53","title":"محاضرة 34","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/LAEGFX04BF22whMkv8tZaNqtWTfkRnEa_720p.mp4"},{"duration":"59:55","title":"محاضرة 35","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/73OsRgjdHDdzdYBS8XgIXV4vIH47Vijr_720p.mp4"},{"duration":"16:31","title":"محاضرة 36","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/4qUgKt8oIoXYNGciOD43XIay3aGRBbSR_720p.mp4"}]},{"name":"مراجعة الفصل الاول","lectures":[{"duration":"27:17","title":"محاضرة 1","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/2IsJ2bXs1AAAsI8tLvyQcGdZEbY4TKfe_720p.mp4"},{"duration":"41:13","title":"محاضرة 2","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/JUeq3GZ2zwrzVklFl3IWBWWnFTXTtoVI_720p.mp4"},{"duration":"42:58","title":"محاضرة 3","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/ixAG7SVMvkWwe2GP73i5a29fIGouSojy_720p.mp4"},{"duration":"5:24","title":"محاضرة 4 سؤال اثرائي","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/vaKCZYjaJKn3SbY274swoCRNq1dwDB4b_720p.mp4"},{"duration":"37:40","title":"محاضرة 5","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/j1oPv364i1R6RyusA8sIlqHMqIeNb3LH_720p.mp4"},{"duration":"3:07:12","title":"مراجعة الفصل الاول الى علاقة كبس","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/4/816ec9a6-5ad9-4d37-81e8-60d252702ade.smil/501f6198-9ab5-47cc-b8dc-fa21ffb324ce/media-3/stream.m3u8"}]},{"name":"الفصل الثاني: الاتزان الكيميائي","lectures":[{"duration":"56:09","title":"محاضرة 1","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/VdTJ4tuG1ClcYp3GNyHQnXsVFjC7ZCoW_720p.mp4"},{"duration":"57:34","title":"محاضرة 2","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/Ry09G0ay8SNRkC9E0DhFcz94HNL49sNG_720p.mp4"},{"duration":"29:16","title":"محاضرة 3","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/18/0311053d-4cc7-4be5-acee-bd9362c27131.smil/9e80e65a-cf09-405d-81ad-f81c26cf714d/media-4/stream.m3u8"},{"duration":"43:50","title":"محاضرة 4","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/3slsFdagXw9f7BEOxrRmQYF4d1FjpNIC_720p.mp4"},{"duration":"1:25:37","title":"محاضرة 5","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/624EvDPhtdPIkig92Q8eS8XvJYymdnu4_720p.mp4"},{"duration":"48:53","title":"محاضرة 6","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/vhW2RuyCLYeTIyUiYkUCUkHUwODH0rdt_720p.mp4"},{"duration":"52:12","title":"محاضرة 7","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/EVqKytOkSzdC1P9OGbJIqvReQmr73yHj_720p.mp4"},{"duration":"41:20","title":"محاضرة 8","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/rlFhI3a7Jmc1VNkuQmYa4e3M2gmvYyrL_720p.mp4"},{"duration":"1:13:01","title":"محاضرة 9","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/ZhHla8CTn95bkzkHYE6HzxjQrDnLCjvJ_720p.mp4"},{"duration":"41:01","title":"محاضرة 10","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/Q4DkuobETkzsTphN7Y7qfUTDnB5OBrxx_720p.mp4"},{"duration":"41:09","title":"محاضرة 11","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/11s7iHM1SuCiprHmXa8GmMvE4M8XqCH5_720p.mp4"},{"duration":"33:03","title":"محاضرة 12","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/VkApETEbXPfKt063h1GcHLqmrb8gzNsZ_720p.mp4"},{"duration":"33:03","title":"محاضرة 13","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/VkApETEbXPfKt063h1GcHLqmrb8gzNsZ_720p.mp4"},{"duration":"19:11","title":"محاضرة 14","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/pfhlcls59ZSTae8RnClax0Xt0dCLaOam_720p.mp4"},{"duration":"1:46:21","title":"محاضرة 15","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/kx56f3oSPGJa1fAPBQMnhkw48Xy798Ls_720p.mp4"},{"duration":"2:02:17","title":"محاضرة 16","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/PGe5UHFLD7hEDweuU9J5v0homdDcwNNu_720p.mp4"},{"duration":"1:10:21","title":"محاضرة 17","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/W2vTsH2kqXsk1PfmLtCmH504h1VBdSFQ_720p.mp4"},{"duration":"57:50","title":"محاضرة 18","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/vkgkqLlo0SNK7qPaeBsgWoSLRte3hyuc_720p.mp4"},{"duration":"1:06:33","title":"محاضرة 19","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/B6A8nTcBidY4nDpMm36nUxfTQL5iOM0r_720p.mp4"},{"duration":"46:32","title":"محاضرة 20","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/0aTPAK4TuAQW38SUm89pzFiez4n4joo4_720p.mp4"},{"duration":"43:42","title":"محاضرة 21","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/o8kLpNx1vPIB5U7qmC8c1JRuuptCUtvx_720p.mp4"},{"duration":"1:10:13","title":"محاضرة 22","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/CM4baGNSzwpDYnKYSBg4fb3cAJOEQhDs_720p.mp4"},{"duration":"58:31","title":"محاضرة 23","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/UDtzYkL3G3oFIfBmnkro2BBYVRCZjAHJ_720p.mp4"},{"duration":"23:38","title":"محاضرة 24","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/LVjJ20oofPC6fYySrCkNcArmgsLGZexK_720p.mp4"},{"duration":"40:10","title":"محاضرة 25","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/Nqbd1V6bUp7upRY6o8pmLXkc3vqVaLrE_720p.mp4"},{"duration":"37:43","title":"محاضرة 26","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/I17FfWm2qZCKq6HG2FGRVme0MdwMxb5L_720p.mp4"},{"duration":"1:15:12","title":"محاضرة 27","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/BjbGNMGc9iP94xzVnIHwD5ax4n1sFuP2_720p.mp4"},{"duration":"40:58","title":"محاضرة 28","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/PbplNZ66GCvUqkLOSmVD7erYiuYz8pFK_720p.mp4"},{"duration":"57:11","title":"محاضرة 29","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/NdyUFrxMzhVLBSjr66QDjp9i2p2prhh0_720p.mp4"},{"duration":"1:00:04","title":"محاضرة 30","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/42v3lUM04ayLOsTm3AXiSh8vKxaZXUif_720p.mp4"},{"duration":"53:50","title":"محاضرة 31","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/89911885-e49e-45c2-b4e2-42975f668319.smil/6f4577cc-e3eb-4d38-86ab-4dec09b852dc/media-3/stream.m3u8"},{"duration":"58:06","title":"حل اسئلة الفصل الثاني المحاضرة 1","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/qUJ0kdwUzuGyG6WKegaG9tcBSzxA9VDP_720p.mp4"},{"duration":"1:16:11","title":"حل اسئلة الفصل الثاني المحاضرة 2","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/JClpqZn3QOBPghmYD21Cj7BJG8e2wT8A_720p.mp4"},{"duration":"1:17:38","title":"مراجعة الفصل الثاني المحاضرة 1","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/F8moPr0FIsZusLaRj1u7FqhHxvQUDdgr_720p.mp4"},{"duration":"47:35","title":"مراجعة الفصل الثاني المحاضرة 2","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/MXuy4tQjbMFNFNuYmZ8Qeu2VEcHnrnN6_720p.mp4"}]},{"name":"حل واجبات الفصل الثاني","lectures":[{"duration":"57:49","title":"محاضرة 1","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/aoSQmbeczr5RQRT8KRYGye1XNPnuH0qd_720p.mp4"},{"duration":"1:17:06","title":"محاضرة 2","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/MsTBRcnQwh74jUhcl8mT5Jfcl4NCP3Sl_720p.mp4"},{"duration":"29:40","title":"محاضرة 3","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/7pa6ngJzyB8ejRjpixmwNmAEJjnW60Dt_720p.mp4"}]},{"name":"الفصل الثالث: الاتزان الايوني","lectures":[{"duration":"38:42","title":"محاضرة 1","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/0LnAdBAWt5bkWTwEaJktxubGlcq0Wo04_720p.mp4"},{"duration":"46:30","title":"محاضرة 2","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/MVfUiGFmrnZZ01KwJtQhrwsu80sPxVZa_720p.mp4"},{"duration":"54:40","title":"محاضرة 3","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/kfREHBp0oDpDeGmmGTwxYi4BS8Q6jUJS_720p.mp4"},{"duration":"33:40","title":"محاضرة 4","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/a8dd7d08-279d-4774-bd3b-2c6bc69dbb24.smil/be96805d-196f-4368-b87b-801a14b37123/media-3/stream.m3u8"},{"duration":"54:49","title":"محاضرة 5","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/VgUJhkzKzNDHvRB3pgJTOSXlSHWLYx2m_720p.mp4"},{"duration":"36:39","title":"محاضرة 6","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/cjTRqev3LUQiZA0leOnmFsWkXaRz9oOK_720p.mp4"},{"duration":"1:02:27","title":"محاضرة 7","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/7CNc0yoNPofiXHcaS4aA1Zq1zgdCv74Z_720p.mp4"},{"duration":"55:49","title":"محاضرة 8","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/sUfUL8JJNHZ6n3nGeAzJ1rr8Fbi7QhAk_720p.mp4"},{"duration":"1:23:43","title":"مراجعة وحل الواجبات","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/00DFyH6nDwxYqALsme2kW2t3cAeM7O2d_720p.mp4"},{"duration":"54:53","title":"محاضرة 9","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/3xoTaAPlCQO6YxpSWLGeb8ZqVpBVz8Oc_720p.mp4"},{"duration":"41:45","title":"محاضرة 10","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/wN3tsDVoT230ZsTZeQ0QLwKVavhG6ADz_720p.mp4"},{"duration":"1:12:45","title":"محاضرة 11","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/tbm4nBrSyKTYhhN6FI0HSQWX30MZwWvq_720p.mp4"},{"duration":"1:15:06","title":"محاضرة 12","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/voVrbfyjCzeXC1PR5ajhiw76qBtKKmGd_720p.mp4"},{"duration":"53:41","title":"محاضرة 13","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/ll7H2skX1k2HEbS8zIJplCkm2erpKppT_720p.mp4"},{"duration":"1:11:38","title":"محاضرة 14","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/rAEOA8zcuOQ4hQsP3rcdTIunj34Gv2IB_720p.mp4"},{"duration":"53:09","title":"محاضرة 15","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/5keG8NeS5MOm6PetipPCH86YtI3a6QgV_720p.mp4"},{"duration":"1:40:18","title":"محاضرة 16","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/R9tFIjr1JWhTa1i6EJFQKWaHOiez20Oy_720p.mp4"},{"duration":"1:11:22","title":"محاضرة 17","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/M3LrjfaIa2qULlpiAVSpB6TYsZfwfZUy_720p.mp4"},{"duration":"1:23:10","title":"محاضرة 18","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/UiB8LabnIHt6PAp5safyk6VmNTExxnxA_720p.mp4"},{"duration":"52:22","title":"محاضرة 19","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/7vUzWViBKR12sqmh85uQCkld0qEOyNPB_720p.mp4"},{"duration":"1:08:20","title":"محاضرة 20","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/yrNKzq4Isjq80JH8jh2KlSRxqxZkKKUy_720p.mp4"},{"duration":"56:12","title":"محاضرة 21","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/pk8VESixi7c58OOhHBvpNNAHhbrsownj_720p.mp4"},{"duration":"1:07:22","title":"محاضرة 22","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/oTd6OVxq2cmZpH465hBSRhX1Gh7h1Za9_720p.mp4"},{"duration":"48:11","title":"محاضرة 23","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/BnKsRjMtJLRLjHf99ieI6rENNSHazg4j_720p.mp4"},{"duration":"56:58","title":"محاضرة 24","url":"https://pub-9bf9f797be0a4677a839ce3cf3e0638f.r2.dev/18/157dc099-bfe3-4fe7-9762-3bcf89fa5fa2.smil/8b4c9d4a-97e6-4b3f-b325-6b94bcba0f4e/media-3/stream.m3u8"},{"duration":"51:46","title":"محاضرة 25","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/vtrIJhsk7cfTYZXdKVD7AeaZ7OKhmcNY_720p.mp4"},{"duration":"48:31","title":"محاضرة 26","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/lIbUvkxtAxd67CQGEeZEJpWQHJUTLQaT_720p.mp4"},{"duration":"1:36:12","title":"محاضرة 27","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/WQmlj3n4MG4Bis0N4fzoWiwetUOsBEvo_720p.mp4"},{"duration":"1:08:31","title":"محاضرة 28","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/Z0uhTaOsTn7ku2vqTp3Ct0kXREMSAIBn_720p.mp4"},{"duration":"1:10:49","title":"محاضرة 29","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/vODkR5lsEWoWjHvInHu4odFgSpNkGmEu_720p.mp4"},{"duration":"1:09:56","title":"محاضرة 30","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/1RsjRuran1B5rCvpqDpR8VcZy0ET0DBv_720p.mp4"},{"duration":"31:40","title":"محاضرة 31","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/CIlRIW8SiPV5hObQZQ21cCAGqIcexsq4_720p.mp4"},{"duration":"1:15:49","title":"محاضرة 32","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/0GowfRLKLAo8Mj2fpqccXAirV0eQKi6X_720p.mp4"}]},{"name":"مراجعة الفصل الثالث","lectures":[{"duration":"1:02:11","title":"محاضرة 1","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/1D9kWgDJgnc596TpKGzst09DSpfBNaqT_720p.mp4"},{"duration":"52:35","title":"محاضرة 2","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/0G25wlwnuHApKegtu3qW6SBARnC026mp_720p.mp4"},{"duration":"31:43","title":"محاضرة 3","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/XW9Y97G38FdxM7pKiunjjlXll7kO2KYL_720p.mp4"},{"duration":"1:05:34","title":"محاضرة 4","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/gZk1FG4hYE7XALZOojiFANLoLPmtuyc7_720p.mp4"},{"duration":"29:50","title":"محاضرة 5","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/QZ8L9MvsbDnOOuGSV3YtEEGxuSscpCLC_720p.mp4"},{"duration":"59:47","title":"محاضرة 6","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/ef1f16fc-917a-43a4-9a30-eac68a6e8d6d.smil/3efbf51e-f80d-492b-81d1-33d6ec432844/media-3/stream.m3u8"},{"duration":"34:05","title":"محاضرة 7","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/a3f0fe38-645c-4330-a2c3-3929c905267c.smil/0b2257a7-6356-47d2-88aa-983a5abe6cf8/media-3/stream.m3u8"}]},{"name":"الفصل الرابع: الكيمياء الكهربائية","lectures":[{"duration":"40:07","title":"محاضرة 1","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/e5e1045e-7eb9-4a1a-a700-ebfd8ed25aec.smil/a173db38-4c71-47bd-bd4e-f72f7ea8c7eb/media-3/stream.m3u8"},{"duration":"50:02","title":"محاضرة 2","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/7798869d-8f94-4a63-905c-e141319602d5.smil/ada646b3-2ec7-4a3c-ad74-ee7da9af6998/media-3/stream.m3u8"},{"duration":"58:36","title":"محاضرة 3","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/c1b75777-3689-468d-bf63-2a2747ac6574.smil/9b1fc517-720a-444f-9c04-0dfab7925341/media-3/stream.m3u8"},{"duration":"1:10:52","title":"محاضرة 4","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/1fd8b5d3-94e9-499a-853b-8ee50574439a.smil/2b8752d3-38a3-4e6f-b9c2-efc1a7eac477/media-3/stream.m3u8"},{"duration":"1:01:34","title":"محاضرة 5","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/4f1c7d37-45e1-46e4-aa53-d9edde7c769e.smil/7275f4a2-cfcf-45f0-95b9-d61263e708d4/media-3/stream.m3u8"},{"duration":"24:52","title":"محاضرة 6","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/d8086c58-d2ed-488d-95dc-adb605367d83.smil/73331d81-5bac-4655-985b-51d24dec4781/media-3/stream.m3u8"},{"duration":"50:36","title":"محاضرة 7","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/8eeadb25-cfcc-42fb-a990-d688ebbd2c5a.smil/96cf83d7-836c-483d-bad9-1bc644471568/media-3/stream.m3u8"},{"duration":"53:06","title":"محاضرة 8","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/1d516bd2-a9cf-4776-864d-ce0bb056618b.smil/4333e108-d96c-4e33-a52b-85799021eac8/media-3/stream.m3u8"},{"duration":"56:14","title":"محاضرة ملحق 8","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/b867249a-99fc-495b-8561-0bf40d973191.smil/f8c99195-5bc0-4b0a-be2d-eba2c8ffdc7d/media-3/stream.m3u8"},{"duration":"13:10","title":"محاضرة 9 هل يمكن 1","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/bf7670a6-a5d7-4af4-a06c-f950897757df.smil/96111034-3a6b-4f6b-badb-4a24648d4fe8/media-3/stream.m3u8"},{"duration":"25:34","title":"محاضرة 9 هل يمكن 2","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/d03d69ca-9ce0-4c83-986f-9a208547e6a9.smil/ce5f2ea2-a5a4-43b6-adcf-3cd9aef8fac2/media-3/stream.m3u8"},{"duration":"7:59","title":"محاضرة 9 هل يمكن 3","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/f2ad12ef-b73f-4fd3-b18f-38fc5fdc00bf.smil/fec485a7-ca58-46a1-8984-3653a2ce05bd/media-3/stream.m3u8"},{"duration":"23:47","title":"محاضرة 9 هل يمكن 4","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/8495650e-926b-466f-a9f8-8756bbb9d870.smil/9686ca1d-06b3-4f76-9da0-c99cc2916c69/media-3/stream.m3u8"},{"duration":"3:55","title":"محاضرة 9 هل يمكن 5","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/90d98941-4795-4832-a77b-2bad6bc6d669.smil/db024673-851d-419f-99d9-ba8bcc2d5fd5/media-3/stream.m3u8"},{"duration":"57:10","title":"محاضرة 10","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/3ccce32a-021d-48fc-876c-b3b7a2bd6648.smil/d712c8e6-3ed6-4674-83ae-13827a6f0660/media-3/stream.m3u8"},{"duration":"32:17","title":"محاضرة 11","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/a9973455-54fe-4b24-828f-f43635f994eb.smil/7e6082df-0d11-4465-a531-ea659b4a5dca/media-3/stream.m3u8"},{"duration":"52:04","title":"محاضرة 12","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/3a6a37ac-2df3-470b-aa8a-65f5071db5dc.smil/8b27c1d5-daee-4d27-9ef8-067958bddc51/media-3/stream.m3u8"},{"duration":"1:03:13","title":"محاضرة 13","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/eee80a1d-5993-4a44-ad9c-ae404635a589.smil/cb7999f1-711f-4f0f-8292-123fba8d0951/media-3/stream.m3u8"},{"duration":"50:33","title":"محاضرة 14","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/659a66a7-fdd6-4c8a-ac00-04158ce63533.smil/b92af8b3-ee46-4352-adac-0ab3aa4610af/media-3/stream.m3u8"},{"duration":"50:07","title":"مراجعة اول 9 محاضرات","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/13b97dd4-29dc-431c-8931-56d25a5d1cc7.smil/2ff9f3c5-7288-4100-90bf-4efb9095edc2/media-3/stream.m3u8"},{"duration":"46:31","title":"محاضرة 15","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/8bec8bc0-f119-40f5-9130-d4d542f636c9.smil/fcbf9970-94c4-4084-b0bd-7097d541f725/media-3/stream.m3u8"},{"duration":"40:22","title":"محاضرة 16","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/2f49e539-18d0-4541-bdbe-00181ec2de16.smil/54f8e3ee-547d-4bcd-8095-b44eb92a9a4c/media-3/stream.m3u8"},{"duration":"20:19","title":"مسائل فرداي 1","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/1bd92ef5-5609-494d-b382-db5d8a6daabc.smil/8333d234-ce30-4b81-b3ba-027cc9207278/media-3/stream.m3u8"},{"duration":"7:57","title":"مسائل فرداي 2","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/43ddf90b-2112-457a-b3f5-2f8fdafa376c.smil/2e4eb5bc-1429-4ca5-aa80-ede6f55e8535/media-3/stream.m3u8"},{"duration":"7:42","title":"مسائل فرداي 3","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/73106f21-e44d-4364-bf67-69521222e686.smil/3eae668a-f19f-44f3-b642-afe17980c627/media-3/stream.m3u8"},{"duration":"11:55","title":"مسائل فرداي 4","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/b4afa943-4328-43aa-8602-949064527bcb.smil/ac78623c-aa5e-4f44-9f29-ae03738e1aa4/media-3/stream.m3u8"},{"duration":"5:54","title":"مسائل فرداي 5","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/15997679-6381-432f-93af-c703db0344dd.smil/0695251b-4f6b-4cd9-a526-64dcf40a07f0/media-3/stream.m3u8"},{"duration":"9:07","title":"مسائل فرداي 6","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/f7727b82-f396-4f9f-840a-4b3f1d01d26a.smil/31b20e1d-43a1-4a50-bfb8-0fd8ef828af6/media-3/stream.m3u8"},{"duration":"18:47","title":"مسائل فرداي 7","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/570574a0-af02-4cec-99af-f7d84a866595.smil/4422d308-eef9-4c96-9c60-ecb0a9c618a7/media-3/stream.m3u8"},{"duration":"43:18","title":"مسائل فرداي 8","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/52db5245-cc29-41f1-aa41-4832f2a020a8.smil/0c03c3ad-0020-4dc8-8efb-5106edd313f7/media-3/stream.m3u8"},{"duration":"17:32","title":"مسائل فرداي 9","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/ff5d4bf5-d4fd-450c-a94f-86682f307b6e.smil/04f7a6d8-1253-4ccf-be22-ba0d44db3312/media-3/stream.m3u8"},{"duration":"18:30","title":"مسائل فرداي 10","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/55f7a230-c803-4ce6-80ad-38a0102b1568.smil/2986a9ec-0cca-4486-8b8b-2b768d2527e5/media-3/stream.m3u8"},{"duration":"1:08:26","title":"شرح قوانين فرداي والبطاريات","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/4/73ed925f-8e2e-449b-86c5-ff6ae397d5c3.smil/6753d0c4-66c1-4a90-b8ea-9f9971497804/media-3/stream.m3u8"}]},{"name":"الفصل الخامس: الكيمياء التناسقية","lectures":[{"duration":"1:05:22","title":"محاضرة 1","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/49bb7814-5ea8-4887-89db-6b2c7934f002.smil/008f7586-193d-4963-8a3a-680e5307d0e3/media-3/stream.m3u8"},{"duration":"59:21","title":"محاضرة 2","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/aa141017-501f-40b7-b75a-5ce83c6f2d6d.smil/e50c01f4-36de-4d11-97c6-cb1241a9354c/media-3/stream.m3u8"},{"duration":"51:50","title":"محاضرة 3","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/4/7d7c437d-dd3d-404e-b6a7-20fa06a498f3.smil/e9c98384-07da-4970-87f7-bc664fa772f0/media-3/stream.m3u8"},{"duration":"1:10:17","title":"محاضرة 4","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/4/20b1ba48-ff09-40d3-9223-fd3909c633b9.smil/d4e37281-bba4-417a-9846-5fddd474eb0c/media-3/stream.m3u8"},{"duration":"1:13:26","title":"محاضرة 5","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/4/a88c4c49-e6f7-40ce-9235-d02980d51344.smil/b1e19f09-8689-4ccc-80ac-e9d33b59ee13/media-3/stream.m3u8"},{"duration":"4:27","title":"مراجعة محاضرة 4 و 5","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/vgloucu6cYPJZbDnxsYdn5v3QeZ8GFY7_720p.mp4"},{"duration":"53:51","title":"محاضرة 6","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/4/58053ccf-d1cb-4e05-add6-0f40264414a5.smil/71cb1831-7de6-4aa3-8621-824e063ebe53/media-3/stream.m3u8"},{"duration":"1:03:29","title":"محاضرة 7","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/4/c2412329-337b-41cd-a20f-3794a7af4772.smil/2f448966-77ad-45ee-800f-9c7edcd56df9/media-3/stream.m3u8"},{"duration":"1:05:22","title":"محاضرة 8","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/4/7a53c05e-bc2c-4b7a-ac19-d87aeb422335.smil/fe606a01-3015-416d-ba94-f569c1dc38ff/media-3/stream.m3u8"},{"duration":"53:16","title":"محاضرة 9","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/4/8796caec-5697-4092-8432-8b90762854ab.smil/6dd85a5b-1b60-4889-a8d9-057c9964f7c1/media-3/stream.m3u8"},{"duration":"14:51","title":"اختبر نفسك","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/4/aabd94b6-7b8d-4594-a29d-36a729de02b7.smil/c25d35dd-5def-4cb0-9402-cd268c2503ae/media-3/stream.m3u8"},{"duration":"59:28","title":"محاضرة 10","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/4/2fba8872-5a60-4570-95c5-09e8c17a63d5.smil/d3f20a21-aa54-4aa3-9cc9-9db76e1ecb69/media-3/stream.m3u8"},{"duration":"1:00:40","title":"مراجعة الفصل الخامس 1","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/4/3fa9a0ff-851e-49a1-8f5a-166384557e76.smil/c6a3ecb0-53db-4278-a5c2-13ee44b11b8f/media-3/stream.m3u8"},{"duration":"17:31","title":"مراجعة الفصل الخامس 2","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/4/0eb8865f-202f-466a-8f81-0504bdec4782.smil/d230651c-920a-4bf7-b339-e01c3a02e1c6/media-3/stream.m3u8"},{"duration":"30:19","title":"مراجعة الفصل الخامس 3","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/4/f85090a1-5dcf-4626-a7e9-c661ffd303d8.smil/f8d3c1a6-4ca1-433c-af35-7b923266e112/media-3/stream.m3u8"},{"duration":"41:32","title":"مراجعة الفصل الخامس 4","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/4/94384a18-9a9f-4dbf-86ff-a959f2b4ed4d.smil/60517430-6b55-4b08-8ccb-127022ab8760/media-3/stream.m3u8"}]},{"name":"الفصل السادس: الكيمياء التحليلية","lectures":[{"duration":"44:46","title":"محاضرة 1","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/4/9f5a1156-b42e-48a7-aa36-e71100157bd6.smil/89ad9fc0-a4f4-4466-93ed-99d50b934f8d/media-3/stream.m3u8"},{"duration":"1:30:48","title":"محاضرة 2","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/4/04482a85-941b-4247-bd82-e51dd5feb76f.smil/5b4313e4-66b4-40f8-9cc2-57d114f59f58/media-3/stream.m3u8"},{"duration":"41:57","title":"محاضرة 3","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/4/75aeb46e-b20a-4f17-b6f7-50b77b3971f5.smil/6fc1a470-3a6f-48ea-a785-55561c43249f/media-3/stream.m3u8"},{"duration":"43:24","title":"محاضرة 4","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/b67e2c32-ea27-40c6-a4c4-5527eb4b2134.smil/d0041e23-47a3-45e5-bcff-5360f1a0c659/media-3/stream.m3u8"},{"duration":"1:19:13","title":"محاضرة 5","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/3cb79fd1-9c83-4ded-a101-0d0f297bbd28.smil/08c25456-f799-44a3-9c7c-7a0ac82ab69c/media-3/stream.m3u8"},{"duration":"28:53","title":"محاضرة 6","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/e4b52f15-e1bf-4f0d-924a-8e0167f75cdc.smil/b419babe-64dc-4481-8ad5-13ac037b1bac/media-3/stream.m3u8"},{"duration":"1:13:37","title":"محاضرة 7","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/72762b6f-5c0c-413b-980b-58b50c58c4f9.smil/0b81d668-a641-447b-9d19-95956af1aa57/media-3/stream.m3u8"},{"duration":"32:48","title":"محاضرة 8 ايتا 1","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/3c6207ff-7e4c-4d7f-831f-fafac9c5a072.smil/9f4bb28e-cb8a-4a70-b5b4-144952cb377f/media-3/stream.m3u8"},{"duration":"18:21","title":"محاضرة 8 ايتا 2","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/f7dec211-15d7-4083-8483-4a416ef9af55.smil/31b85a37-3053-42e3-86b3-17dbcafc9df4/media-3/stream.m3u8"},{"duration":"17:54","title":"محاضرة 8 ايتا 3","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/09f488d1-4794-4918-b39b-5c374502c032.smil/e6ad50d7-04de-4d3e-b3c5-0d33342c4ac1/media-3/stream.m3u8"},{"duration":"28:18","title":"محاضرة 8 ايتا 4","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/30e205ef-607a-450f-94cd-509d7d727a26.smil/dfce52b3-44c4-409a-80f4-de0a3760f331/media-3/stream.m3u8"},{"duration":"21:11","title":"محاضرة 9 قوانين التحليل الحجمي","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/13ff5c26-12ce-4a4c-b439-42fa152ce77d.smil/49125926-d005-4206-87a5-cc60f2ce0197/media-3/stream.m3u8"},{"duration":"5:56","title":"محاضرة 9 المسائل القصيرة 1","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/fab7981a-ef74-4e5f-a32f-134a7016b312.smil/99d1eb56-c3e7-4541-a215-8909ff132643/media-3/stream.m3u8"},{"duration":"2:00","title":"محاضرة 9 المسائل القصيرة 2","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/8d8a385f-18aa-4baf-b77d-d61e4d5c2a95.smil/17dd4653-2669-4f7d-a4f0-fc10979a7647/media-3/stream.m3u8"},{"duration":"1:41","title":"محاضرة 9 المسائل القصيرة 3","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/31bb40e9-0432-41d4-b10b-1c9b7da7f662.smil/56ea9ca0-415a-4964-a152-4e238e0c719d/media-3/stream.m3u8"},{"duration":"3:37","title":"محاضرة 9 المسائل القصيرة 4","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/68907ac9-dbf4-4c06-91a1-6d26b24f5bb4.smil/9dcd6672-b420-4d01-9961-175283194975/media-3/stream.m3u8"},{"duration":"3:31","title":"محاضرة 9 المسائل القصيرة 5","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/c604b309-716f-4d99-b2a6-bad14f7de5e9.smil/3af83a12-5a5f-455d-9c4b-15ff2fce95b4/media-3/stream.m3u8"},{"duration":"7:00","title":"محاضرة 9 المسائل القصيرة 6","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/835f5ae8-9e30-424f-bd99-81104d15fa49.smil/99ca1b8c-b2e3-438c-ac59-59f32bcf6daa/media-3/stream.m3u8"},{"duration":"8:23","title":"محاضرة 9 المسائل القصيرة 7","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/1d652be8-9179-406e-8ab8-f6e6e39309e6.smil/91c277cf-e36a-41c7-a669-b4dcde8ab6ae/media-3/stream.m3u8"},{"duration":"5:16","title":"محاضرة 9 المسائل القصيرة 8","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/5f18ea7b-41ba-44ea-bf56-31e9164b6c71.smil/5c810cc0-9ccb-4db1-b8fa-8baa05d0fa8d/media-3/stream.m3u8"},{"duration":"9:47","title":"محاضرة 9 المسائل القصيرة 9","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/a30dfffe-9b4b-4a05-b3a6-77d3bd83f039.smil/41bbcffb-63e7-4be0-8376-b4e1f8a51c3d/media-3/stream.m3u8"},{"duration":"4:27","title":"محاضرة 9 المسائل القصيرة 10","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/1097a566-b31f-4cf3-a57f-08cd3f184e98.smil/3c638829-23c1-4cc6-8349-4aa238407d86/media-3/stream.m3u8"},{"duration":"1:21:28","title":"محاضرة 10 تجربة التسحيح","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/f2b2d442-b5ea-451a-a3eb-7655d529f78b.smil/31affd40-fb15-4052-a3f8-7b1c71494fbc/media-3/stream.m3u8"},{"duration":"33:47","title":"محاضرة 11 مسائل التسحيح 1","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/6ce46de7-b145-4092-ab3f-978250d78cd0.smil/00704e00-8535-4a10-86fb-057250964ace/media-3/stream.m3u8"},{"duration":"16:19","title":"محاضرة 11 مسائل التسحيح 2","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/fc16b454-5cdf-4320-8dd6-8b0bd5cfcd7f.smil/af04d80b-945a-4528-8b91-d1f221125e65/media-3/stream.m3u8"},{"duration":"11:42","title":"محاضرة 11 مسائل التسحيح 3","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/bb2fe96b-c820-4924-b5ac-99e7e6be6c39.smil/f1ed7e11-f774-43ba-b8b5-d53644374b8b/media-3/stream.m3u8"},{"duration":"3:31","title":"محاضرة 11 مسائل التسحيح 4","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/27fe969e-bd0a-43c9-a039-4bfb08d16676.smil/23e0e226-369c-42b3-9103-c7e9e9d4d6b3/media-3/stream.m3u8"},{"duration":"6:44","title":"محاضرة 11 مسائل التسحيح 5","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/cb7f3818-e139-4f76-b6ba-60c42bbcd6a2.smil/418310ea-b5e1-4630-836c-64d5a760f954/media-3/stream.m3u8"},{"duration":"15:40","title":"محاضرة 11 مسائل التسحيح 6","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/670590ef-28aa-4d9b-afe5-41adde1a7f16.smil/d069c1ab-b07e-4ffc-917f-7c1800568df2/media-3/stream.m3u8"},{"duration":"10:52","title":"محاضرة 11 مسائل التسحيح 7","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/3edfec92-43a0-4f5b-a820-c4525d297500.smil/578cf074-ae3f-42d4-b6a2-45358f31b9f6/media-3/stream.m3u8"},{"duration":"25:54","title":"محاضرة 11 مسائل التسحيح 8","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/9dc26451-124c-4e9e-9119-1a94c4e7f9cd.smil/d0fc446f-e70b-4164-bde1-c1d1f84f12f9/media-3/stream.m3u8"},{"duration":"14:33","title":"محاضرة 11 مسائل التسحيح 9","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/a59b4d85-1bcc-4ea8-b31d-c30904fd7e40.smil/53b39d47-1865-4e3e-a25d-2747fabbd237/media-3/stream.m3u8"},{"duration":"23:14","title":"محاضرة 11 مسائل التسحيح 10","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/fc2508c9-ad1d-49a1-b9e4-05b76f9ecd2b.smil/bd39aac7-8765-4834-ad5b-879ad0560976/media-3/stream.m3u8"}]},{"name":"الفصل السابع: الكيمياء العضوية","lectures":[{"duration":"24:34","title":"اساسيات عضوية 1","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/9OzDwXCb9opJYDeoyBOYWO01ynUyYOwH_720p.mp4"},{"duration":"27:29","title":"اساسيات عضوية 2","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/6f33yFNklfvGm7fN6O73ka0EFzfrQemd_720p.mp4"},{"duration":"56:27","title":"اساسيات عضوية 3","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/8MmwQdQWl8Nol9g1DOaBTHN6GlwoLB6G_720p.mp4"},{"duration":"37:56","title":"اساسيات عضوية 4","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/58TgoeyHXfhX6ajicQ0nzQY9v4yIwrJb_720p.mp4"},{"duration":"39:35","title":"محاضرة 1","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/1QarwZhk6sfnmsPftJxszKVMcjM84O41_720p.mp4"},{"duration":"1:00:42","title":"محاضرة 2","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/yVQxSc74KLVih8AW8l5SLJwT0jszoetF_720p.mp4"},{"duration":"1:14:33","title":"محاضرة 3","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/YpXU5EqIto0X7yd1C7tDfKBMRN6LiOZu_720p.mp4"},{"duration":"52:52","title":"محاضرة 4","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/IVrY86h6ZlYYWAwMkwX0kDxhe80KNB5m_720p.mp4"},{"duration":"40:12","title":"محاضرة 5","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/0t7TM3Adgd43bzsl3ux7K984OeoLL8xE_720p.mp4"},{"duration":"41:39","title":"محاضرة 6","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/y4DJWpPoU5sf42KdsUsmBQaNB5mzn2jt_720p.mp4"},{"duration":"1:13:21","title":"محاضرة 7","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/0xuzO2CmsolmRirQqtaEEJtjgT1IrrZp_720p.mp4"},{"duration":"23:42","title":"محاضرة 8","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/O0BVoCGIMRGr8zDhBxCoH0JOzqTQPlLM_720p.mp4"},{"duration":"1:12:35","title":"محاضرة 9","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/7VsEmrf7wXqMjA3J9eqyLspZNXnVkzPc_720p.mp4"},{"duration":"1:32:41","title":"محاضرة 10","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/Lm03EL2Bv6ISfk15aHQ8VlsWzaZGnpM3_720p.mp4"},{"duration":"31:27","title":"محاضرة 11","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/4/faa69395-9804-411a-aaad-7394ec24a2e5.smil/14ce70db-535a-43da-9a90-1cc246b30f2f/media-3/stream.m3u8"},{"duration":"46:37","title":"محاضرة 12","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/4/b25d6d76-98ed-4328-a3bc-eb1cdc4ba2d3.smil/2088061f-43fb-4d65-a463-95e3e0c021e0/media-3/stream.m3u8"},{"duration":"24:53","title":"محاضرة 13","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/4/0711cc7d-30d0-401c-8eaa-8b4540822753.smil/6dabbb4a-5c16-4afe-9355-2599c3118039/media-3/stream.m3u8"},{"duration":"15:39","title":"محاضرة 14","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/4/38fb9125-aa2f-4308-93a7-de06bdb247d8.smil/5abae2c4-b03a-476b-9786-ce0594d72f52/media-3/stream.m3u8"},{"duration":"24:45","title":"محاضرة 15","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/cf89c3ce-8a98-4837-8bf2-dde8a8e83266.smil/547733b6-c55a-4231-bf2c-98dc8145e9a2/media-3/stream.m3u8"},{"duration":"23:14","title":"محاضرة 16","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/15df9c2b-d752-449a-bfc4-99c5a7cc63f7.smil/e9738f93-90ed-48da-9ed2-3fbc589e4c58/media-3/stream.m3u8"},{"duration":"54:40","title":"محاضرة 17","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/9ac1d6e5-843f-479b-9cb3-bb038b358176.smil/c19d8929-024c-45dc-8b84-8726a391d1c2/media-3/stream.m3u8"},{"duration":"57:58","title":"محاضرة 18","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/183e166e-e46d-4878-9ad1-dc153121807f.smil/862531d5-caf0-4ac6-bf08-60b87de1e474/media-3/stream.m3u8"},{"duration":"15:21","title":"محاضرة 19","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/e4fde8c1-a2a6-461e-9f84-284823265d36.smil/14733f2a-a4dc-4af8-aa33-6ef3574e4c16/media-3/stream.m3u8"},{"duration":"58:07","title":"محاضرة 20","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/2fdae5d9-1b15-4129-a009-b90f9ba61ab0.smil/208eddca-6315-4083-9fd9-18d206b63e63/media-3/stream.m3u8"},{"duration":"41:57","title":"محاضرة 21","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/23307ad7-0d39-428f-80f2-53fdfd1909c9.smil/d6fead79-3d2a-4835-9eaf-1f0cb14b4c16/media-3/stream.m3u8"},{"duration":"41:57","title":"محاضرة 22","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/f7f0b104-3bac-422b-8379-533af8d32df8.smil/9affc8fb-eb2a-46ca-b559-ff6ee6dec6ba/media-3/stream.m3u8"},{"duration":"12:50","title":"محاضرة 23","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/d006d2c4-5ef0-4db8-8daa-82443ab723f1.smil/34cad93f-fcce-4c48-af1c-6649d1d5727a/media-3/stream.m3u8"},{"duration":"33:49","title":"محاضرة 24","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/4Z0ViImbMwOaRi3leT06xcwAYR26XK4Q_720p.mp4"},{"duration":"16:54","title":"محاضرة 25","url":"https://vidcdn.akamai-cdn-delivery.com/cdn/1rvO0yspuk2M9Ta4wCTCiq0eZKl0mBAb_720p.mp4"},{"duration":"46:28","title":"محاضرة 26","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/b93c2709-3bee-4e92-ab40-3878448cbd4f.smil/310751fb-b26f-4e72-a087-bbf5c6d49c27/media-3/stream.m3u8"},{"duration":"35:35","title":"محاضرة 27","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/4b6b5cc8-110e-4bcd-b4c7-49fecd9e1983.smil/e27695da-c72f-4c6c-9a1a-97fca07f1ef9/media-3/stream.m3u8"},{"duration":"15:38","title":"محاضرة 28","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/32/2b30f49f-8c5c-4667-a6b4-78f726004515.smil/a1f53033-ad6f-4f54-86c2-66e6bebf0d57/media-3/stream.m3u8"}]},{"name":"الفصل الثامن: الكيمياء الحياتية","lectures":[{"duration":"39:52","title":"محاضرة 1","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/2d9a828f-3e3d-484f-97ac-a7eea42105be.smil/22843260-3ba4-4951-882f-2547f9d6bc8b/media-3/stream.m3u8"},{"duration":"24:57","title":"محاضرة 2","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/101b1baf-cc65-4217-aa64-cf49e76046ba.smil/cba67011-3fad-40f0-a0e2-e12316f63022/media-3/stream.m3u8"},{"duration":"26:42","title":"محاضرة 3","url":"https://9bf9f797be0a4677a8-akamai-cdn.com/6/f7391cd4-7bd3-4128-ba97-8245a0e54d29.smil/e6c4fd89-6cec-4620-92a0-180bf1f3f115/media-3/stream.m3u8"}]}]};

// Flatten for O(1) prev/next navigation
const LECTURES = [];
RAW.classes.forEach((ch, ci) =>
  ch.lectures.forEach((lc, li) =>
    LECTURES.push({ ...lc, id: `${ci}_${li}`, globalIdx: LECTURES.length, chapterIdx: ci, chapterName: ch.name })
  )
);

// ─── UTILITIES ────────────────────────────────────────────────────────────────
const isHLS = (url) => url.includes('.m3u8');

const fmt = (s) => {
  if (!s || isNaN(s)) return '0:00';
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sc = Math.floor(s % 60);
  return h > 0 ? `${h}:${String(m).padStart(2,'0')}:${String(sc).padStart(2,'0')}` : `${m}:${String(sc).padStart(2,'0')}`;
};

// ─── HLS.JS LOADER ───────────────────────────────────────────────────────────
let _hlsState = 'idle';
let _hlsCbs = [];
const loadHls = (cb) => {
  if (_hlsState === 'loaded') { cb(window.Hls); return; }
  _hlsCbs.push(cb);
  if (_hlsState === 'idle') {
    _hlsState = 'loading';
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.4.14/hls.min.js';
    s.onload = () => { _hlsState = 'loaded'; _hlsCbs.forEach(f => f(window.Hls)); _hlsCbs = []; };
    s.onerror = () => { _hlsState = 'idle'; };
    document.head.appendChild(s);
  }
};

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const STYLES = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#07080A; --s0:#0D0F12; --s1:#12141A; --s2:#191C23; --s3:#20232C;
  --border:#1C1F28; --border2:#252830;
  --text:#E8E3DA; --dim:#6E6A62; --muted:#2E2C28;
  --gold:#BF9B55; --gold2:#D4AE6A; --gold-bg:rgba(191,155,85,0.12); --gold-ring:rgba(191,155,85,0.3);
  --red:#E05454;
}
html,body,#root{height:100%;background:var(--bg);color:var(--text);font-family:'Cairo',sans-serif;direction:rtl}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--s3);border-radius:3px}
.app{display:flex;height:100dvh;overflow:hidden;background:var(--bg)}
.main{flex:1;min-width:0;overflow-y:auto;display:flex;flex-direction:column}
.sidebar{width:310px;min-width:310px;border-left:1px solid var(--border);overflow-y:auto;background:var(--s0);display:flex;flex-direction:column}

/* ── Video Player ── */
.vp-wrap{position:relative;background:#000;aspect-ratio:16/9;width:100%;cursor:pointer;overflow:hidden;user-select:none}
.vp-wrap:-webkit-full-screen{aspect-ratio:unset;width:100vw;height:100vh}
.vp-wrap:fullscreen{aspect-ratio:unset;width:100vw;height:100vh}
.vp-wrap video{width:100%;height:100%;display:block;object-fit:contain;background:#000}
.vp-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;opacity:0;transition:opacity .15s}
.vp-overlay.flash{opacity:1}
.vp-overlay svg{filter:drop-shadow(0 2px 12px rgba(0,0,0,.7))}
.vp-controls{position:absolute;bottom:0;left:0;right:0;padding:36px 14px 10px;background:linear-gradient(transparent,rgba(0,0,0,.82));transition:opacity .22s;direction:ltr}
.vp-controls.hidden{opacity:0;pointer-events:none}
.vp-progress{height:4px;background:rgba(255,255,255,.18);border-radius:2px;position:relative;cursor:pointer;margin-bottom:9px;transition:height .15s}
.vp-progress:hover,.vp-progress.dragging{height:6px}
.vp-buf{position:absolute;inset-block:0;left:0;background:rgba(255,255,255,.28);border-radius:2px}
.vp-fill{position:absolute;inset-block:0;left:0;background:var(--gold2);border-radius:2px}
.vp-thumb{position:absolute;width:13px;height:13px;background:var(--gold2);border-radius:50%;top:50%;transform:translate(-50%,-50%);opacity:0;transition:opacity .15s;box-shadow:0 0 0 3px rgba(212,174,106,.3)}
.vp-progress:hover .vp-thumb,.vp-progress.dragging .vp-thumb{opacity:1}
.vp-tip{position:absolute;bottom:calc(100% + 8px);background:rgba(0,0,0,.9);color:#fff;font-size:11px;padding:3px 7px;border-radius:5px;transform:translateX(-50%);pointer-events:none;white-space:nowrap;font-family:'Cairo',sans-serif}
.vp-row{display:flex;align-items:center;gap:6px}
.vp-btn{background:none;border:none;color:rgba(255,255,255,.8);cursor:pointer;padding:5px;border-radius:6px;display:flex;align-items:center;justify-content:center;transition:color .15s,background .15s;flex-shrink:0}
.vp-btn:hover{color:#fff;background:rgba(255,255,255,.1)}
.vp-time{font-size:12px;color:rgba(255,255,255,.75);letter-spacing:.03em;margin:0 4px;white-space:nowrap}
.vp-spacer{flex:1}
.vp-speed{position:relative}
.vp-speed-menu{position:absolute;bottom:calc(100% + 4px);left:0;background:var(--s2);border:1px solid var(--border2);border-radius:8px;overflow:hidden;min-width:70px;z-index:20;box-shadow:0 8px 24px rgba(0,0,0,.5)}
.vp-speed-item{padding:6px 16px;cursor:pointer;font-size:12px;text-align:center;font-family:'Cairo',sans-serif;transition:background .1s;white-space:nowrap;color:var(--text)}
.vp-speed-item:hover{background:var(--s3)}
.vp-speed-item.act{color:var(--gold2);font-weight:600}
.vol-wrap{display:flex;align-items:center;gap:4px}
.vol-slider{-webkit-appearance:none;appearance:none;width:60px;height:3px;border-radius:2px;outline:none;cursor:pointer;background:rgba(255,255,255,.25)}
.vol-slider::-webkit-slider-thumb{-webkit-appearance:none;width:11px;height:11px;border-radius:50%;background:var(--gold2);cursor:pointer}

/* ── Sidebar ── */
.sb-header{padding:18px 16px 14px;border-bottom:1px solid var(--border);flex-shrink:0}
.sb-title{font-size:15px;font-weight:700;color:var(--text);letter-spacing:.02em}
.sb-sub{font-size:12px;color:var(--dim);margin-top:2px}
.sb-body{flex:1;padding:8px}
.chapter{margin-bottom:2px;border-radius:10px;overflow:hidden}
.ch-head{padding:10px 12px;cursor:pointer;display:flex;align-items:center;gap:10px;border-radius:10px;transition:background .15s;user-select:none}
.ch-head:hover{background:var(--s2)}
.ch-head.open{background:var(--s1)}
.ch-icon{width:28px;height:28px;border-radius:8px;background:var(--gold-bg);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--gold2);font-size:13px;font-weight:700}
.ch-info{flex:1;min-width:0}
.ch-name{font-size:13px;font-weight:600;color:var(--text);line-height:1.3}
.ch-count{font-size:11px;color:var(--dim);margin-top:1px}
.ch-arrow{color:var(--dim);transition:transform .2s;flex-shrink:0}
.ch-arrow.open{transform:rotate(180deg)}
.ch-lectures{overflow:hidden}
.lc-item{padding:8px 10px 8px 12px;cursor:pointer;border-radius:8px;display:flex;align-items:center;gap:10px;transition:background .15s;margin:1px 0}
.lc-item:hover{background:var(--s2)}
.lc-item.act{background:var(--gold-bg);box-shadow:inset 2px 0 0 var(--gold)}
.lc-dot{width:7px;height:7px;border-radius:50%;background:var(--muted);flex-shrink:0}
.lc-dot.act{background:var(--gold)}
.lc-title{flex:1;font-size:12.5px;color:var(--dim);line-height:1.35}
.lc-item.act .lc-title{color:var(--text);font-weight:500}
.lc-dur{font-size:11px;color:var(--muted);flex-shrink:0;direction:ltr}
.lc-item.act .lc-dur{color:var(--dim)}

/* ── Info bar ── */
.info{padding:14px 20px 10px;display:flex;flex-direction:column;gap:4px;flex-shrink:0}
.info-ch{font-size:11.5px;color:var(--gold);font-weight:500;text-transform:uppercase;letter-spacing:.05em}
.info-title{font-size:17px;font-weight:700;color:var(--text);line-height:1.3}
.info-meta{font-size:12px;color:var(--dim);margin-top:2px}
.nav-row{display:flex;gap:8px;padding:8px 20px 16px}
.nav-btn{flex:1;padding:9px 14px;border-radius:10px;border:1px solid var(--border2);background:var(--s1);color:var(--text);cursor:pointer;font-family:'Cairo',sans-serif;font-size:13px;font-weight:500;transition:background .15s,border-color .15s;display:flex;align-items:center;justify-content:center;gap:6px;direction:rtl}
.nav-btn:hover:not(:disabled){background:var(--s2);border-color:var(--border2)}
.nav-btn:disabled{opacity:.35;cursor:not-allowed}
.nav-btn.primary{background:var(--gold-bg);border-color:var(--gold-ring);color:var(--gold2)}
.nav-btn.primary:hover{background:rgba(191,155,85,0.2)}

/* ── Empty / Loading states ── */
.loading{display:flex;align-items:center;justify-content:center;padding:40px;color:var(--dim);font-size:14px;gap:8px}
.spinner{width:18px;height:18px;border:2px solid var(--s3);border-top-color:var(--gold);border-radius:50%;animation:spin .7s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}

/* ── Responsive ── */
@media(max-width:768px){
  .app{flex-direction:column-reverse;height:auto;min-height:100dvh}
  .sidebar{width:100%;min-width:0;height:auto;max-height:55vh;border-left:none;border-top:1px solid var(--border)}
  .main{height:auto;overflow:visible}
  .main video{max-height:56vw}
  .nav-row{padding:8px 12px 12px}
  .info{padding:10px 14px 6px}
  .info-title{font-size:14px}
}
`;

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Ic = {
  play: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v14l11-7-11-7z"/></svg>,
  pause: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>,
  playLg: <svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M8 5.14v14l11-7-11-7z"/></svg>,
  pauseLg: <svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>,
  back: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>,
  forward: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>,
  volOn: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>,
  volOff: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>,
  fs: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>,
  fsExit: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>,
  chevronD: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>,
  chevronR: <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>,
  clock: <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm.01 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>,
  prev: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>,
  next: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zm2.5-6L16 6v12z"/><path d="M16 6h2v12h-2z"/></svg>,
};

// ─── VIDEO PLAYER ─────────────────────────────────────────────────────────────
function VideoPlayer({ lecture, onNext, onPrev, hasNext, hasPrev }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const hlsRef = useRef(null);
  const hideTimer = useRef(null);
  const progressRef = useRef(null);
  const isDragging = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);
  const [buf, setBuf] = useState(0);
  const [vol, setVol] = useState(1);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [ctrl, setCtrl] = useState(true);
  const [speedMenu, setSpeedMenu] = useState(false);
  const [isFS, setIsFS] = useState(false);
  const [tipVisible, setTipVisible] = useState(false);
  const [tipX, setTipX] = useState(0);
  const [tipTime, setTipTime] = useState('');
  const [flashIcon, setFlashIcon] = useState(null);

  // Load video source
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !lecture) return;
    setPlaying(false); setCur(0); setDur(0); setBuf(0);

    const destroyHls = () => { if (hlsRef.current) { hlsRef.current.destroy(); hlsRef.current = null; } };

    if (isHLS(lecture.url)) {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        destroyHls(); video.src = lecture.url;
      } else {
        loadHls((Hls) => {
          if (!Hls || !Hls.isSupported()) return;
          destroyHls();
          const hls = new Hls({ maxBufferLength: 15, maxMaxBufferLength: 30, startLevel: -1 });
          hls.loadSource(lecture.url);
          hls.attachMedia(video);
          hlsRef.current = hls;
        });
      }
    } else {
      destroyHls(); video.src = lecture.url;
    }
    video.playbackRate = speed;
    return destroyHls;
  }, [lecture?.id]);

  // Video event handlers
  useEffect(() => {
    const v = videoRef.current; if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTimeUpdate = () => { setCur(v.currentTime); if (v.buffered.length) setBuf(v.buffered.end(v.buffered.length - 1)); };
    const onDurationChange = () => setDur(v.duration);
    const onEnded = () => { setPlaying(false); if (hasNext) setTimeout(onNext, 800); };
    v.addEventListener('play', onPlay); v.addEventListener('pause', onPause);
    v.addEventListener('timeupdate', onTimeUpdate); v.addEventListener('durationchange', onDurationChange);
    v.addEventListener('ended', onEnded);
    return () => { v.removeEventListener('play', onPlay); v.removeEventListener('pause', onPause); v.removeEventListener('timeupdate', onTimeUpdate); v.removeEventListener('durationchange', onDurationChange); v.removeEventListener('ended', onEnded); };
  }, [hasNext, onNext]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const v = videoRef.current; if (!v) return;
      switch (e.code) {
        case 'Space': e.preventDefault(); togglePlay(); break;
        case 'ArrowRight': e.preventDefault(); v.currentTime = Math.min(v.currentTime + 10, v.duration); showFlash('forward'); break;
        case 'ArrowLeft': e.preventDefault(); v.currentTime = Math.max(v.currentTime - 10, 0); showFlash('back'); break;
        case 'ArrowUp': e.preventDefault(); { const nv = Math.min(v.volume + 0.1, 1); v.volume = nv; setVol(nv); } break;
        case 'ArrowDown': e.preventDefault(); { const nv = Math.max(v.volume - 0.1, 0); v.volume = nv; setVol(nv); } break;
        case 'KeyF': toggleFS(); break;
        case 'KeyM': setMuted(m => { v.muted = !m; return !m; }); break;
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Fullscreen events
  useEffect(() => {
    const onFS = () => setIsFS(!!document.fullscreenElement || !!document.webkitFullscreenElement);
    document.addEventListener('fullscreenchange', onFS);
    document.addEventListener('webkitfullscreenchange', onFS);
    return () => { document.removeEventListener('fullscreenchange', onFS); document.removeEventListener('webkitfullscreenchange', onFS); };
  }, []);

  const showControls = useCallback(() => {
    setCtrl(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setCtrl(false), 3000);
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current; if (!v) return;
    if (v.paused) { v.play().catch(() => {}); } else { v.pause(); }
  }, []);

  const toggleFS = useCallback(() => {
    const el = containerRef.current; if (!el) return;
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (videoRef.current?.webkitEnterFullscreen) videoRef.current.webkitEnterFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }
  }, []);

  const showFlash = (type) => {
    setFlashIcon(type); setTimeout(() => setFlashIcon(null), 400);
  };

  const seekTo = (clientX) => {
    const v = videoRef.current; const bar = progressRef.current;
    if (!v || !bar || !v.duration) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    v.currentTime = pct * v.duration;
  };

  const onProgressMouseMove = (e) => {
    const bar = progressRef.current; if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setTipX(pct * 100); setTipTime(fmt(pct * dur)); setTipVisible(true);
    if (isDragging.current) seekTo(e.clientX);
  };

  const onProgressMouseDown = (e) => {
    isDragging.current = true; seekTo(e.clientX);
    const onUp = () => { isDragging.current = false; window.removeEventListener('mouseup', onUp); window.removeEventListener('mousemove', onDrag); };
    const onDrag = (e2) => seekTo(e2.clientX);
    window.addEventListener('mouseup', onUp); window.addEventListener('mousemove', onDrag);
  };

  // Touch scrubbing
  const onProgressTouch = (e) => {
    e.preventDefault();
    const touch = e.touches[0]; if (!touch) return;
    seekTo(touch.clientX);
  };

  const setVolume = (v) => {
    const vid = videoRef.current; if (!vid) return;
    vid.volume = v; setVol(v);
    if (v > 0 && muted) { vid.muted = false; setMuted(false); }
  };

  const toggleMute = () => {
    const v = videoRef.current; if (!v) return;
    v.muted = !muted; setMuted(!muted);
  };

  const setPlaybackSpeed = (s) => {
    const v = videoRef.current; if (v) v.playbackRate = s;
    setSpeed(s); setSpeedMenu(false);
  };

  const progress = dur > 0 ? (cur / dur) * 100 : 0;
  const buffered = dur > 0 ? (buf / dur) * 100 : 0;
  const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  return (
    <div
      ref={containerRef}
      className="vp-wrap"
      onMouseMove={showControls}
      onMouseEnter={showControls}
      onTouchStart={showControls}
      onClick={(e) => { if (e.target === videoRef.current || e.target === containerRef.current) { togglePlay(); showFlash(playing ? 'pause' : 'play'); } }}
    >
      <video ref={videoRef} preload="metadata" playsInline />

      {/* Flash icon overlay */}
      <div className={`vp-overlay${flashIcon ? ' flash' : ''}`}>
        {flashIcon === 'play' && Ic.playLg}
        {flashIcon === 'pause' && Ic.pauseLg}
        {flashIcon === 'forward' && <svg width="38" height="38" viewBox="0 0 24 24" fill="white"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/><text x="5" y="27" fill="white" fontSize="5" fontFamily="Cairo">+10</text></svg>}
        {flashIcon === 'back' && <svg width="38" height="38" viewBox="0 0 24 24" fill="white"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>}
      </div>

      {/* Controls */}
      <div className={`vp-controls${ctrl ? '' : ' hidden'}`} onClick={(e) => e.stopPropagation()}>
        {/* Progress */}
        <div
          ref={progressRef}
          className={`vp-progress${isDragging.current ? ' dragging' : ''}`}
          onMouseMove={onProgressMouseMove}
          onMouseLeave={() => setTipVisible(false)}
          onMouseDown={onProgressMouseDown}
          onTouchMove={onProgressTouch}
          onTouchStart={onProgressTouch}
        >
          <div className="vp-buf" style={{ width: `${buffered}%` }} />
          <div className="vp-fill" style={{ width: `${progress}%` }} />
          <div className="vp-thumb" style={{ left: `${progress}%` }} />
          {tipVisible && <div className="vp-tip" style={{ left: `${tipX}%` }}>{tipTime}</div>}
        </div>

        {/* Buttons row */}
        <div className="vp-row">
          <button className="vp-btn" onClick={togglePlay} title={playing ? 'إيقاف (Space)' : 'تشغيل (Space)'}>
            {playing ? Ic.pause : Ic.play}
          </button>
          <button className="vp-btn" onClick={() => { videoRef.current && (videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0)); }} title="ترجع 10 ثوان (←)">
            {Ic.back}
          </button>
          <button className="vp-btn" onClick={() => { videoRef.current && (videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, videoRef.current.duration)); }} title="تقدم 10 ثوان (→)">
            {Ic.forward}
          </button>

          <div className="vol-wrap">
            <button className="vp-btn" onClick={toggleMute}>{muted || vol === 0 ? Ic.volOff : Ic.volOn}</button>
            <input className="vol-slider" type="range" min="0" max="1" step="0.05" value={muted ? 0 : vol} onChange={e => setVolume(+e.target.value)} />
          </div>

          <span className="vp-time">{fmt(cur)} / {fmt(dur)}</span>
          <div className="vp-spacer" />

          {/* Speed */}
          <div className="vp-speed">
            {speedMenu && (
              <div className="vp-speed-menu">
                {SPEEDS.map(s => (
                  <div key={s} className={`vp-speed-item${speed === s ? ' act' : ''}`} onClick={() => setPlaybackSpeed(s)}>{s}x</div>
                ))}
              </div>
            )}
            <button className="vp-btn" style={{ fontSize: 11, fontFamily: "'Cairo', sans-serif", padding: '4px 7px', letterSpacing: '.03em' }}
              onClick={() => setSpeedMenu(m => !m)} onBlur={() => setTimeout(() => setSpeedMenu(false), 150)}>
              {speed}x
            </button>
          </div>

          <button className="vp-btn" onClick={toggleFS} title="ملء الشاشة (F)">{isFS ? Ic.fsExit : Ic.fs}</button>
        </div>
      </div>
    </div>
  );
}

// ─── LECTURE ITEM ─────────────────────────────────────────────────────────────
function LectureItem({ lc, isActive, onClick }) {
  const ref = useRef(null);
  useEffect(() => { if (isActive && ref.current) ref.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, [isActive]);
  return (
    <div ref={ref} className={`lc-item${isActive ? ' act' : ''}`} onClick={onClick}>
      <div className={`lc-dot${isActive ? ' act' : ''}`} />
      <span className="lc-title">{lc.title}</span>
      <span className="lc-dur">{lc.duration}</span>
    </div>
  );
}

// ─── CHAPTER ACCORDION ────────────────────────────────────────────────────────
function Chapter({ chapter, chapterIdx, activeLcId, onSelect, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyRef = useRef(null);

  // Auto-expand if active lecture is in this chapter
  useEffect(() => {
    if (activeLcId) {
      const [ci] = activeLcId.split('_');
      if (parseInt(ci) === chapterIdx) setOpen(true);
    }
  }, [activeLcId, chapterIdx]);

  const lectures = LECTURES.filter(l => l.chapterIdx === chapterIdx);
  const totalDur = lectures.reduce((acc, l) => {
    const parts = l.duration.split(':').map(Number);
    return acc + (parts.length === 3 ? parts[0] * 3600 + parts[1] * 60 + parts[2] : parts[0] * 60 + parts[1]);
  }, 0);
  const totalH = Math.floor(totalDur / 3600);
  const totalM = Math.floor((totalDur % 3600) / 60);

  return (
    <div className="chapter">
      <div className={`ch-head${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
        <div className="ch-icon">{chapterIdx + 1}</div>
        <div className="ch-info">
          <div className="ch-name">{chapter.name}</div>
          <div className="ch-count">{lectures.length} محاضرة · {totalH > 0 ? `${totalH}س ` : ''}{totalM}د</div>
        </div>
        <span className={`ch-arrow${open ? ' open' : ''}`}>{Ic.chevronD}</span>
      </div>
      {open && (
        <div className="ch-lectures" style={{ padding: '2px 4px 6px' }}>
          {lectures.map(lc => (
            <LectureItem key={lc.id} lc={lc} isActive={lc.id === activeLcId} onClick={() => onSelect(lc)} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({ activeLcId, onSelect }) {
  const totalLectures = LECTURES.length;
  return (
    <div className="sidebar">
      <div className="sb-header">
        <div className="sb-title">منصة الهاشمي</div>
        <div className="sb-sub">{RAW.classes.length} فصول · {totalLectures} محاضرة</div>
      </div>
      <div className="sb-body">
        {RAW.classes.map((ch, ci) => (
          <Chapter key={ci} chapter={ch} chapterIdx={ci} activeLcId={activeLcId} onSelect={onSelect} defaultOpen={ci === 0} />
        ))}
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeLc, setActiveLc] = useState(LECTURES[0]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = STYLES;
    document.head.appendChild(style);

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&display=swap';
    document.head.appendChild(fontLink);

    return () => { document.head.removeChild(style); document.head.removeChild(fontLink); };
  }, []);

  const selectLecture = useCallback((lc) => setActiveLc(lc), []);

  const onNext = useCallback(() => {
    if (activeLc.globalIdx < LECTURES.length - 1) setActiveLc(LECTURES[activeLc.globalIdx + 1]);
  }, [activeLc]);

  const onPrev = useCallback(() => {
    if (activeLc.globalIdx > 0) setActiveLc(LECTURES[activeLc.globalIdx - 1]);
  }, [activeLc]);

  const hasPrev = activeLc.globalIdx > 0;
  const hasNext = activeLc.globalIdx < LECTURES.length - 1;
  const nextLc = hasNext ? LECTURES[activeLc.globalIdx + 1] : null;
  const prevLc = hasPrev ? LECTURES[activeLc.globalIdx - 1] : null;

  return (
    <div className="app">
      <Sidebar activeLcId={activeLc?.id} onSelect={selectLecture} />
      <div className="main">
        <VideoPlayer lecture={activeLc} onNext={onNext} onPrev={onPrev} hasNext={hasNext} hasPrev={hasPrev} />
        <div className="info">
          <div className="info-ch">{activeLc.chapterName}</div>
          <div className="info-title">{activeLc.title}</div>
          <div className="info-meta">
            <span style={{ marginLeft: 10 }}>⏱ {activeLc.duration}</span>
          </div>
        </div>
        <div className="nav-row">
          <button className="nav-btn" onClick={onPrev} disabled={!hasPrev}>
            {Ic.prev}
            <span>{prevLc ? prevLc.title : 'السابقة'}</span>
          </button>
          <button className="nav-btn primary" onClick={onNext} disabled={!hasNext}>
            <span>{nextLc ? nextLc.title : 'التالية'}</span>
            {Ic.next}
          </button>
        </div>
      </div>
    </div>
  );
}
