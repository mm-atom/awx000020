import global from '@mmstudio/global';

interface IFileDoc {
	id: string;
	contentType: string;
	name: string;
	md5: string;
}

export default function upload_file(filePath: string, name: string) {
	return new Promise<IFileDoc>((resolve, reject) => {
		const host = global('host', 'http://127.0.0.1:8889');
		const url = `${host}/fsweb/upload`;
		wx.uploadFile({
			filePath,
			name,
			url,
			success(res) {
				const data = res.data;
				const files = JSON.parse(data) as IFileDoc[];
				resolve(files[0]);
			},
			fail() {
				reject(false);
			}
		});
	});
}
