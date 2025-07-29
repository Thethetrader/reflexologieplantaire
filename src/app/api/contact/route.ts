import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, prenom, telephone, forfait, lieu, email, raison } = body;

    // Validation basique
    if (!nom || !prenom || !telephone || !email || !forfait || !lieu) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Configuration Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // ton email Gmail
        pass: process.env.GMAIL_APP_PASSWORD // mot de passe d'application
      }
    });

    // Envoi d'email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'tom.reflexologue@gmail.com',
      subject: `Nouveau RDV - ${prenom} ${nom}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">Nouveau rendez-vous</h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nom:</strong> ${prenom} ${nom}</p>
            <p><strong>Téléphone:</strong> ${telephone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Forfait:</strong> ${forfait}</p>
            <p><strong>Lieu:</strong> ${lieu}</p>
            ${raison ? `<p><strong>Raison:</strong> ${raison}</p>` : ''}
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Message envoyé depuis le formulaire de contact du site web.
          </p>
        </div>
      `
    });

    return NextResponse.json(
      { message: 'Message envoyé avec succès' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
} 