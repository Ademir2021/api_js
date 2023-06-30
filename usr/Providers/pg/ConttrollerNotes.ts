import { Request, Response } from "express"
import { client } from "../../connect"
import PDFPrinter from 'pdfmake'
import fs from 'fs'
import { IReportNotes } from "../../Interfaces/IReportNotes"

export class ConttrollersNotes {

    async index(request: Request, response: Response) {
        try {
            response.status(200).json({ status: 'sucesss' })
        } catch (err) {
            console.log("Error Occurred ! " + err)
        }
    };
    
    async select(request: Request, response: Response) {
        try {
            const { num_nota } = request.params
            const res_nota = await client.query("SELECT  *FROM nota WHERE nota = '" + num_nota + "'")
            const { nota, filial, comprador, cpf, endereco, telefone, usuario, email, emitida,
                    val_rec, desc_venda, total_venda, fantasia, f_endereco, cnpj, inscricao,
                    f_telefone, f_email } = res_nota.rows[0]
            const res_itens_nota = await client.query("SELECT  *FROM itens_nota WHERE id_venda = '" + num_nota + "'")
            const itens = res_itens_nota.rows

            const body = [];

            const columnsTitle = [
                { text: "Item", style: "columnsTitle" },
                { text: "Descrição produtos", style: "columnsTitle" },
                { text: "Marca", style: "columnsTitle" },
                { text: "Quant", style: "columnsTitle" },
                { text: "Valor Unit", style: "columnsTitle" },
                { text: "Total Item", style: "columnsTitle" },
            ]

            const columnsBody = new Array();
            columnsTitle.forEach(column => columnsBody.push(column));
            body.push(columnsBody)

            for (let item of itens) {
                const rows = new Array();
                rows.push(item.item)
                rows.push(item.descricao)
                rows.push(item.marca)
                rows.push(item.quant)
                rows.push(`R$ ${item.valor}`)
                rows.push(`R$ ${item.total}`)
                body.push(rows)
            }

            const img = {
                image: 'logo.png',
                width: 136,
                height: 48,
                opacity: 0.9,
                margin: 2,
            }

            const fonts = {
                Helvetica: {
                    normal: 'Helvetica',
                    bold: 'Helvetica-Bold',
                    italics: 'Helvetica-Oblique',
                    bolditalics: 'Helvetica-BoldOblique'
                },
            };

            const printer = new PDFPrinter(fonts)

            const docDefinitions: IReportNotes | any = {
                defaultStyle: { font: "Helvetica" },
                content: [
                    {
                        style: 'columnsFilial',
                        table: {
                            heights: function (row: any) {
                                return 10;
                            },

                            widths: ["28%", "28%", "21%", "23%"],
                            body: [
                                [
                                    img,
                                    `${filial}
                                     ${fantasia}
                                CNPJ ${cnpj}
                             INCRIC. ${inscricao}
                                     ${f_endereco}
                            TELEFONE ${f_telefone}
                                     ${f_email}\n`,
                                   `\nNota de venda\n Nº 000${nota}
                                  \nEspécie\n[PE]`,
                                   `\n\nData de emissão\n\n${
                                    emitida.toLocaleString('pt-BR', { timezone: 'UTC' })}`,
                                ]
                            ]
                        }
                    },
                    {
                        text: '\nCLIENTE/DESTINATÁRIO', style: 'title'
                     },
                    {
                        style: 'columnsPerson',
                        table: {
                            widths: ["50%", "50%"],
                            body: [
                                [`Nome:${comprador}`, `Telefone(1):${telefone}`],
                                [`CPF:${cpf}`, `Telefone(2):`],
                                [`Endereço:${endereco}`,`Email:${email}`],
                                ['Cidade: Barbosa Ferraz.', `NULL`],
                                ['Estado: PR', `User:${usuario}`],
                                [`CEP: 86960-000`, `Email: ${email}`]
                            ]
                        }
                    },
                    {
                        text: `\n\n DADOS PRODUTOS/SERVIÇOS`, style: "title"
                    },
                    {
                        style: 'columnsNota',
                        table: {
                            heights: function (row: any) {
                                return 10;
                            },
                            widths: ["6%", "46%", "15%", "7%", "12%", "14%"],
                            body
                        },
                    },
                    {
                        text: '\nVALORES/TOTAIS', style: 'title'
                    },
                    {
                        style: '',
                        table: {
                            widths: ['*', '*', '*', 100],
                            body: [
                                [`Produtos/Serviços\nR$ ${val_rec}`,
                                `Desconto/Produtos\nR$ ${desc_venda}`,
                                `Total Recebido\nR$${total_venda}`,
                                `Total Nota\nR$${total_venda}`]
                            ]
                        }
                    },
                    {
                        text: '\nDADOS COMPLEMENTARES', style: 'title'
                    },
                    {
                        style: "",
                        table: {
                            widths: ["*"],
                            body: [
                                [`Observações: Está nota Nº ${nota} não possui valor fiscal`]
                            ]
                        }
                    }

                ],
                styles: {
                    title: {
                        bold: true,
                        fontSize: 9,
                    },
                    columnsFilial: {
                        fontSize: 9,
                        fonts: "Helvetica-BoldOblique",
                        alignment: "center",
                        margin: 2,
                        bold: true,
                    },
                    columnsPerson: {
                        fontSize: 9,
                        alignment: "left",
                        margin: 2
                    },
                    columnsNota: {
                        fontSize: 9,
                        alignment: "left",
                        color: "",
                        margin: 2,
                        bold: false,
                    },
                    columnsTitle: {
                        fontSize: 9,
                        bold: true,
                        fillColor: "",
                        color: "black",
                        margin: 2
                    },
                }
            };

            const pdfDoc = printer.createPdfKitDocument(docDefinitions)

            pdfDoc.pipe(fs.createWriteStream("Relatorio.pdf"))

            const chunks: any = [];

            pdfDoc.on("data", (chunk: any) => {
                chunks.push(chunk)
            })

            pdfDoc.end();

            pdfDoc.on("end", () => {
                const result = Buffer.concat(chunks)
                response.end(result)
                // console.log(result)
            })

            //console.log("Relatório concluido");

        } catch (err) {
            response.json("Error Occurred ! " + err)
        }
    };
}