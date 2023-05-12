import { Request, Response } from "express"
import { client } from "../../connect"
import PDFPrinter from 'pdfmake'
import fs from 'fs'
import { IReportNotes } from "../../Interfaces/IReportNotes"

import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export const formatDate = (date: string) => {
    return format(parseISO(date), "dd 'de' MMMM 'de' yyy", {
        locale: ptBR
    })
}

export class ConttrollersNotes {
    async index(request: Request, response: Response) {
        try {
            response.status(200).json({ status: 'sucesss' })
        } catch (err) {
            console.log("Error Occurred !!" + err)
        }
    };
    async select(request: Request, response: Response) {
        try {
            const { num_nota } = request.params
            const res_nota = await client.query("SELECT  *FROM nota WHERE nota = '" + num_nota + "'")
            const nota = res_nota.rows[0].nota
            const filial = res_nota.rows[0].filial
            const comprador = res_nota.rows[0].comprador
            const cpf = res_nota.rows[0].cpf
            const usuario = res_nota.rows[0].usuario
            const email = res_nota.rows[0].email
            const emitida = res_nota.rows[0].emitida
            const val_rec = res_nota.rows[0].val_rec
            const desc_venda = res_nota.rows[0].desc_venda
            const total_venda = res_nota.rows[0].total_venda

            const res_itens_nota = await client.query("SELECT  *FROM itens_nota WHERE id_venda = '" + num_nota + "'")
            const itens = res_itens_nota.rows

            const body = [];

            const columnsTitle = [
                { text: "Item", style: "columnsTitle" },
                { text: "Descrição Produtos", style: "columnsTitle" },
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

                            widths: ["auto", 120, 120, 100],
                            body: [
                                [
                                img,
                                `${filial}
                                CNPJ: 18.069.383/0001-10
                                Avenida Castro Alves, 1241
                                Barbosa Ferraz - PR.
                                CEP: 86960-000
                                Telefone (44) 98852-1033\n`,
                                `Nota de Venda\n Nº 000${nota}
                                \nEspécie\n[PE]`,
                                `Emitida\n${emitida}`,
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
                            widths: ["auto", "auto"],
                            body: [
                                [`Nome:${comprador}`, `User:${usuario}`],
                                [`CPF:${cpf}`, `Email USer: ${email}`],
                                [`Endereço: AV, Castro Avles, 1241`,
                                    `Cidade: Barbosa Ferraz`],
                                ['Estado: PR.', `CEP: 86960-000`],
                                ['Telefone(1):(44) 98851-1033', `Telefone(2):`],
                                [`Email: ${email}`, `[null]`]
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
                            widths: [30, "auto", 70, 40, 56, 58,],
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
                        bold: false,
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
            response.json("Error Occurred !!" + err)
        }
    };
}